import { useState } from 'react'
import { useAuth } from '@hooks/useAuth'
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa'

const Profile = () => {
  const { user } = useAuth()
  const [editing, setEditing] = useState(false)

  return (
    <div className="page-container">
      <h1 className="section-title">My Profile</h1>

      <div className="max-w-3xl mx-auto">
        <div className="card p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brown-900">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="label-text">First Name</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-4 text-gray-400" />
                <input
                  type="text"
                  value={user?.firstName || ''}
                  className="input-field pl-10"
                  disabled={!editing}
                />
              </div>
            </div>

            <div>
              <label className="label-text">Last Name</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-4 text-gray-400" />
                <input
                  type="text"
                  value={user?.lastName || ''}
                  className="input-field pl-10"
                  disabled={!editing}
                />
              </div>
            </div>

            <div>
              <label className="label-text">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-4 text-gray-400" />
                <input
                  type="email"
                  value={user?.email || ''}
                  className="input-field pl-10"
                  disabled
                />
              </div>
            </div>

            <div>
              <label className="label-text">Phone</label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-4 text-gray-400" />
                <input
                  type="tel"
                  value={user?.phone || ''}
                  className="input-field pl-10"
                  disabled={!editing}
                />
              </div>
            </div>

            <button
              onClick={() => setEditing(!editing)}
              className="btn-primary w-full"
            >
              {editing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
