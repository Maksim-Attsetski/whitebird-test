import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  // const { user } = useAuth();

  // console.log(user);
  // useEffect(() => {
  //   supabase.auth.getUser().then((r) => {
  //     if (r.error) {
  //       navigate(routes.auth);
  //     }
  //   });
  // }, []);

  return <div>HomePage</div>;
};

export default HomePage;
