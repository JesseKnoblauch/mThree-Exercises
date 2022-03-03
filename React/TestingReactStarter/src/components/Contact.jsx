import { formatPhoneNumber } from "../utils/formatPhoneNumber";

function Contact({ imgSrc = contactName, telNumber, email }) {
  return (
    <figure className="w-56 flex flex-col items-center bg-gray-50  rounded-xl p-8 space-y-2 shadow-xl m-4 ">
      <div>
        <img
          className="w-24 h-24 rounded-full"
          src={""}
          alt="the contact's headshot"
        />
      </div>
      <h1 className="text-lg font-semibold">{contactName}</h1>
      <p className="font-light text-gray-500">{formatPhoneNumber(telNumber)}</p>
      <p className="font-light text-gray-500">{email}</p>
    </figure>
  );
}

export default Contact;
