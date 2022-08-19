import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const MeetUpPage = () => {
  function addMeetupHandler(enteredFormData) {
    console.log(enteredFormData);
  }
  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default MeetUpPage;
