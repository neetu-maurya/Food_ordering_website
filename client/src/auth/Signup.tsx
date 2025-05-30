import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import { Link,  useNavigate } from "react-router-dom";
import { Loader2, LockKeyhole, Mail, PhoneCall, User } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Signupinputstate, userSignupSchema } from "@/schema/userschema";
import { useUserStore } from "@/store/useUserStore";

//typescript me type define karne ka 2 tarika hota hai
/*interface LoginInputState{
  email:string;
  password:string;
} when you use class component then we use it simply in inheritance
interface LoginInputWithAge extends LoginInputState{
age:string;
}
*/
/*type SignupInputState = {
  fullname: string;
  email: string;
  password: string;
  contact: string;
}; in zod file we define its schema so in signup page we don't need to define type because of use of zod ,zod provide type safety also */
const Signup = () => {
  const [input, setInput] = useState<Signupinputstate>({
      fullname:"",
      email:"",
      password:"", 
      contact:"", 
  });
  const [errors, setErrors] = useState<Partial<Signupinputstate>>({});
  const {signup, loading} = useUserStore();
  const navigate = useNavigate();

  const changeEventHandler = (e:ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setInput({...input, [name]:value});
  }
  const loginSubmitHandler = async (e:FormEvent) => {
      e.preventDefault();
      // form validation check start
      const result = userSignupSchema.safeParse(input);
      if(!result.success){
          const fieldErrors = result.error.formErrors.fieldErrors;
          setErrors(fieldErrors as Partial<Signupinputstate>);
          return;
      }
      console.log("valid data ,submitted",input);
      // login api implementation start here
      
        try {
           await signup(input);
           navigate("/verify-email");

        }catch(error)
        {
          console.log(error);

        }
       
      
  }

return (
  <div className="flex items-center justify-center min-h-screen">
    <form onSubmit={loginSubmitHandler} className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4">
      <div className="mb-4">
      <h1 className="font-bold text-3xl text-red-500 animate-bounce-reflection text-center">
            TotatoEats :)
          </h1>
      </div>
      <div className="mb-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Full Name"
            name="fullname"
            value={input.fullname}
            onChange={changeEventHandler}
            className="pl-10 focus-visible:ring-1"
          />
          <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
          { errors && <span className="text-xs text-red-500">{errors.fullname}</span>}
        </div>
      </div>
      <div className="mb-4">
        <div className="relative">
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="pl-10 focus-visible:ring-1"
          />
          <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
          { errors && <span className="text-xs text-red-500">{errors.email}</span>}
        </div>
      </div>
      <div className="mb-4">
        <div className="relative">
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="pl-10 focus-visible:ring-1"
          />
          <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
          { errors && <span className="text-xs text-red-500">{errors.password}</span>}
        </div>
      </div>
      <div className="mb-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Contact"
            name="contact"
            value={input.contact}
            onChange={changeEventHandler}
            className="pl-10 focus-visible:ring-1"
          />
           <PhoneCall className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors.contact && <span className="text-xs text-red-500">{errors.contact}</span>}
          </div>

      </div>
      <div className="mb-10">
          {loading ? (
            <Button
              disabled
              className="bg-yellow-300 hover:bg-yellow-200 active:bg-yellow-400 w-full text-black font-semibold py-2 rounded-lg shadow-md transition duration-200 transform hover:scale-105 active:scale-95"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait...
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-yellow-300 hover:bg-yellow-200 active:bg-yellow-400 w-full text-black font-semibold py-2 rounded-lg shadow-md transition duration-200 transform hover:scale-105 active:scale-95"
            >
              Signup
            </Button>
          )}

      </div>
      <Separator/>
      <p className="mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
      </p>
    </form>
  </div>
);
};

export default Signup;