# == Schema Information
#
# Table name: users
#
#  id            :integer          not null, primary key
#  email         :string
#  uid           :string
#  name          :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  session_token :string
#  nickname      :string
#  provider      :string           default("facebook")
#  admin         :boolean          default("false")
#

require 'rails_helper'

RSpec.describe User, :type => :model do
  it { should validate_presence_of(:nickname) }
  it { should have_many(:authored_tracks) }
  it { should have_many(:stages) }

  it 'should set the session_token before validation' do
    user = User.new
    user.valid?
    expect(user.session_token).not_to be_nil
  end

  describe '::find_or_create_from_auth_hash' do
    it 'finds a user if one exists with the same uid' do
      user = create(:user, uid: 12345, provider: "github")
      found_user = User.find_or_create_from_auth_hash(fake_auth_hash.merge(uid: 12345), "github")
      expect(user).to eq(found_user)
    end

    it 'creates a new user if one does not exist with that uid' do
      expect {
        User.find_or_create_from_auth_hash(fake_auth_hash, "github")
      }.to change(User, :count).by(1)
    end
  end

  describe '#reset_session_token!' do
    it 'resets the session token and returns it' do
      u = create(:user)
      old_token = u.session_token
      expect(u.reset_session_token!).not_to eq(old_token)
    end
  end
end
