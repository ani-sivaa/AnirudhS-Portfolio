import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid";

type Props = {};

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
  role?: string;
};

function ContactMe({}: Props) {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Hi, my name is ${formData.name}. \n ${formData.message} \n (${formData.email} (${formData.role}))`
    );

    window.location.href = `mailto:anisiva213@gmail.com?subject=${subject}&body=${body}`;
    console.log(formData); // Debugging: Log form data
  };

  return (
    <div className="h-screen flex flex-col text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center">
      {/* Section Header */}
      <div className="flex flex-col items-center space-y-4 mb-10">
        <h3 className="uppercase tracking-[20px] text-gray-500 text-2xl">
          Contact Me
        </h3>
        <h4 className="text-4xl font-semibold text-center">
          I got what you need.{" "}
          <span className="decoration-[#FFFDD0] underline">Let's talk.</span>
        </h4>
      </div>

      {/* Content Section */}
      <div className="flex flex-col space-y-10">
        {/* Contact Details */}
        <div className="space-y-5">
          <div className="flex items-center space-x-5 justify-center">
            <PhoneIcon className="h-7 w-7 text-[#FFFDD0]" />
            <p className="text-2xl">+1(925)548-0122</p>
          </div>

          <div className="flex items-center space-x-5 justify-center">
            <EnvelopeIcon className="h-7 w-7 text-[#FFFDD0]" />
            <p className="text-2xl">anisiva213@gmail.com</p>
          </div>

          <div className="flex items-center space-x-5 justify-center">
            <MapPinIcon className="h-7 w-7 text-[#FFFDD0]" />
            <p className="text-2xl">Santa Cruz, CA</p>
          </div>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2 w-fit mx-auto"
        >
          <div className="flex space-x-2">
            <input
              {...register("name", { required: true })}
              className="contactInput"
              type="text"
              placeholder="Name"
            />
            <input
              {...register("email", { required: true })}
              className="contactInput"
              type="email"
              placeholder="Email"
            />
            <select
              {...register("role")}
              className="contactInput"
              defaultValue=""
            >
              <option value="" disabled>
                I am a...
              </option>
              <option value="recruiter">Recruiter</option>
              <option value="student">Student</option>
              <option value="other">Other</option>
            </select>
          </div>
          <input
            {...register("subject", { required: true })}
            className="contactInput"
            type="text"
            placeholder="Subject"
          />
          <textarea
            {...register("message", { required: true })}
            className="contactInput"
            placeholder="Your Message"
          />
          <button
            type="submit"
            className="bg-[#FFFDD0] py-5 px-10 rounded-md text-black font-bold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactMe;
