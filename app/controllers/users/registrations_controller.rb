class Users::RegistrationsController < Devise::RegistrationsController
  #layout "frontpage"
  respond_to :json
  skip_before_action :verify_authenticity_token

  # allow name, username and photo as parameter
  before_action :configure_permitted_parameters

  # before_action :configure_sign_up_params, only: [:create]
  # before_action :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  def create
    # super
    build_resource(sign_up_params)
    resource_saved = resource.save
    # 2.times do
    #   AdminMeetingSchedule.create!(investor_profile_id: resource.profilable_id,day: Date::DAYNAMES.sample,start_time: (Time.now.beginning_of_day + rand(8..18).hour)) if resource.profilable_type == "InvestorProfile"
    # end
    # yield resource if block_given?
    # if all the three are succesfully created

    if resource_saved
      # create profile_type of user
      # if resource.profilable_type == 'UserProfile'
      #   user_profile = UserProfile.new
      #   resource.is_public = true
      # elsif resource.profilable_type == "InvestorProfile"
      #   user_profile = InvestorProfile.new
      #   resource.is_public = false
      # end
      #
      # # skip validation and save the user_profile for now
      # user_profile_saved= user_profile.save(validate: false)
      # # assign polymorophic relation to profilable
      # resource.profilable_id = user_profile.id
      # resource.profilable_type = user_profile.class
      # resource.save

      if resource.active_for_authentication?
        set_flash_message :notice, :signed_up if is_flashing_format?
        sign_up(resource_name, resource)
        respond_with resource, location: after_sign_up_path_for(resource)
      else
        set_flash_message :notice, :"signed_up_but_#{resource.inactive_message}" if is_flashing_format?
        expire_data_after_sign_in!
        respond_with resource, location: after_inactive_sign_up_path_for(resource)
      end
    else
      clean_up_passwords resource
      @validatable = devise_mapping.validatable?
      if @validatable
        @minimum_password_length = resource_class.password_length.min
      end
      respond_with resource
    end
  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  def update
    super && self.user_changed
  end

  def destroy
      resource.soft_delete
      Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name)
      set_flash_message :notice, :destroyed if is_flashing_format?
      yield resource if block_given?
      respond_with_navigational(resource){ redirect_to after_sign_out_path_for(resource_name) }
  end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:email])
    devise_parameter_sanitizer.permit(:account_update, keys: [:photo, :name, profilable_attributes: [:id, :industry, :profession, :skills, :something_cool, :tagline, :funds_to_offer, :description]])
  end

  # update profile or user without password
  def update_resource(resource, params)
    resource.update_without_password(params)
  end
  #
  def after_update_path_for(resource)
    user_profile_path(resource)
  end

  def user_changed
    resource.target_followers.each do |target_follower|
      target_follower.follower.profilable.notifications.create(
      :notification_text => "#{resource.name} have updated his profile."
      )
    end
  end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  # end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:photo])
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
