import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SingleUser from "./SingleUser";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/v1/user/bulk?filter=${filter}`
        );

        if (res.data && res.data.users) {
          setUsers(res.data.users);
        } else {
          toast.error("Unexpected response structure.");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        toast.error("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, [filter]);

  return (
    <div className="ml-10 mr-10">
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {users.length > 0 ? (
          users.map((user) => <SingleUser key={user._id} user={user} />)
        ) : (
          <div>No users found</div>
        )}
      </div>
    </div>
  );
};

export default Users;
