import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaUser, FaUserShield, FaUserTie } from 'react-icons/fa';
import Swal from 'sweetalert2';


const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  // TanStack Query to load users
  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });

  // Role change function
  const handleRoleChange = async (user, newRole) => {
    if(user.role === newRole) return;
    try {
       Swal.fire({
      title: "Are you sure?",
      text: `${user.displayName} role will be changed to ${newRole}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Conform and Continue!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}/role`, { role: newRole })
        .then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.displayName} marked ${newRole}`,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
      }
    });
    } catch (error) {
      // toast.error("Failed to update role");
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Users ({users.length})</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.photoURL} alt={user.displayName} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                      
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="flex gap-2">
                  {/* User */}
                  <FaUser
                    className={`cursor-pointer ${user.role === "user" ? "text-green-500" : "text-gray-400"}`}
                    size={22}
                    title="Set as User"
                    onClick={() => handleRoleChange(user, "user")}
                  />
                  {/* Creator */}
                  <FaUserTie
                    className={`cursor-pointer ${user.role === "creator" ? "text-yellow-500" : "text-gray-400"}`}
                    size={22}
                    title="Set as Creator"
                    onClick={() => handleRoleChange(user, "creator")}
                  />
                  {/* Admin */}
                  <FaUserShield
                    className={`cursor-pointer ${user.role === "admin" ? "text-red-500" : "text-gray-400"}`}
                    size={22}
                    title="Set as Admin"
                    onClick={() => handleRoleChange(user, "admin")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
