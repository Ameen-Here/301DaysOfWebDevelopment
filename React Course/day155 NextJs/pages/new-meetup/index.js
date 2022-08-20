import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const MeetUpPage = () => {
  const router = useRouter();
  async function addMeetupHandler(enteredFormData) {
    console.log(enteredFormData);
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredFormData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    router.replace("/");
  }
  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default MeetUpPage;
