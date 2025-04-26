import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/useUserStore";
import { Loader2 } from "lucide-react";
import React, { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const VerifyEmail = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRef = useRef<HTMLInputElement[]>([]);

  const { loading, verifyEmail } = useUserStore();
  const navigate=useNavigate();

  const handleChange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }

    // Move to the next input field id a digit is entered
    if (value !== "" && index < 5 && inputRef.current[index + 1]) {
      inputRef.current[index + 1]!.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRef.current[index - 1]) {
      inputRef.current[index - 1]!.focus();
    }
  };
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verificationCode = otp.join("");
    try {
      await verifyEmail(verificationCode);
     navigate("/");
    } catch (error) {
      // Handle any error feedback here
      toast.error("Failed to verify the code. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="p-8 rounded-md w-full max-w-md flex flex-col gap-10 border border-gray-200">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl">Verify your email</h1>
          <p className="text-sm text-gray-600">
            Enter your 6-digit code sent to your email address
          </p>
        </div>
        <form onSubmit={submitHandler}>
          <div className="flex justify-between">
            {otp.map((letter: string, idx: number) => (
              <Input
                key={idx}
                ref={(element) => (inputRef.current[idx] = element!)}
                type="text"
                maxLength={1}
                value={letter}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(idx, e.target.value)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(idx, e)
                }
                className="md:w-12 md:h-12 w-8 h-8 text-center text-sm md:text-2xl font-normal md:font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>
          <div className="mt-6">
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
                Verify
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
