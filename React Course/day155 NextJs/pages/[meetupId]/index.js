import MeetupDetails from "../../components/meetups/MeetupDetails";
import { MongoClient, ObjectId } from "mongodb";

function MeetupDetailsPage(props) {
  return (
    <MeetupDetails
      title={props.title}
      src={props.src}
      address={props.address}
      description={props.description}
    />
  );
}

export async function getStaticPaths() {
  // Fetch all detail id
  const client = await MongoClient.connect("your database code");
  const db = client.db();
  const meetUpCollections = db.collection("meetup");
  const meetupIds = await meetUpCollections.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: "blocking",
    paths: meetupIds.map((data) => ({
      params: { meetupId: data._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // Fetch single data
  const id = context.params.meetupId;

  const client = await MongoClient.connect("your database code");
  const db = client.db();
  const meetUpCollections = db.collection("meetup");
  const selectedMeetupData = await meetUpCollections.findOne({
    _id: ObjectId(id),
  });
  client.close();

  return {
    props: {
      id: selectedMeetupData._id.toString(),
      title: selectedMeetupData.title,
      address: selectedMeetupData.address,
      src: selectedMeetupData.image,
      description: selectedMeetupData.description,
    },
  };
}

export default MeetupDetailsPage;
