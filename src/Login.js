import axios from "axios";
import useLocalStorage from "use-local-storage";
const Login = () => {
  const [token, setToken] = useLocalStorage("token", "");
  const registerUser = (event) => {
    event.preventDefault();
    const userObject = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    axios.post("/register/login", userObject).then((res) => {
      console.log(res.data);
      if (!res.data.status) {
        alert("Username already exist");
      } else {
        alert("Logged Successfully");
        setToken(res.data.debug_data);
        console.log(res.data.debug_data);
      }
    });
  };
  return (
    <div className='text-center'>
      <form
        onSubmit={registerUser}
        className='w-50 m-auto p-3 mt-4 text-center border border-dark rounded'
      >
        <h1>Login Form</h1>
        <div className='form-group'>
          <input
            type='text'
            name='username'
            placeholder='Enter Username'
            className='form-control w-75 m-auto mt-3 mb-4'
          />
          <input
            type='password'
            name='password'
            placeholder='Enter Password'
            className='form-control w-75 m-auto mt-3 mb-4'
          />
          <button className='btn btn-primary'>Register</button>
        </div>
      </form>
    </div>
  );
};
export default Login;
