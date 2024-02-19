import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.profile);
  return (
    <section className="flex flex-col justify-between gap-3 sm:w-1/2 md:w-1/3 rounded-md dark-bg p-5">
      <div className="text-2xl mb-3">
        <i className="bi bi-person-fill" /> Profile: @{user.username}
      </div>
      <div>Username: {user.username}</div>
      <div>Email: {user.email}</div>
    </section>
  );
};

export { ProfilePage };
