

import React, { useState } from "react";
import axios from "axios";
 import { fetchUser, updateUser } from "../../../redux/userAction";
 import { useDispatch, useSelector } from "react-redux";

const UpdateDetails = ({ user }) => {
    const dispatch = useDispatch();
     const { loading, } = useSelector((state) => state.user.user);
  const [name, setName] = useState(user.name || "");
  const [about, setAbout] = useState(user.about || "");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(user.profile_image || "");

  // Handle file input for profile image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);

    // Preview image before upload
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use FormData to handle file uploads
    const formData = new FormData();
    formData.append("name", name);
    formData.append("about", about);
    if (profileImage) {
      formData.append("profile_image", profileImage);
    }

    try {
      // Make API call to update user profile
      dispatch(updateUser(formData));
    } catch (error) {
      // Handle error
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="profile-form">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Profile Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {previewImage && (
            <img src={previewImage} alt="Profile Preview" width="100" />
          )}
        </div>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label>About</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Write something about yourself"
          />
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateDetails;






// import React, { useState } from "react";
// import { Tabs, Tab, Row, Col, Nav } from "react-bootstrap";
// import { Form, Button, Image } from "react-bootstrap";
// import { fetchUser, updateUser } from "../../../redux/userAction";
// import { useDispatch, useSelector } from "react-redux";

// function UpdateDetails({ user }) {
//   const dispatch = useDispatch();
//   const { loading, } = useSelector((state) => state.user.user);

//   const [formData, setFormData] = useState({
//     name: user && user.name,
//     about: user && user.about,
//   });

//   const [profile_image, setProfile_image] = useState(
//     user?.profile_image || null
//   );

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfile_image(file);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formDataToSend = new FormData();
//     formDataToSend.append("name", formData.name);
//     formDataToSend.append("about", formData.about);

//     if (profile_image) {
//       formDataToSend.append("profile_image", profile_image);
//     }
//     dispatch(updateUser(formDataToSend));
//     dispatch(fetchUser());
//   };
//   return (
//     <div>
//       <Form className="max-w-md mx-auto p-3 shadow-lg">
//         <div className="text-center mb-4">
//           <input
//             type="file"
//             accept="image/*"
//             id="profileImageUpload"
//             style={{ display: "none" }}
//             onChange={handleImageChange}
//           />
//           <div>
//             <Image
//               src={
//                 profile_image && typeof profile_image === "object"
//                   ? URL.createObjectURL(profile_image)
//                   : user?.profile_image
//               }
//               roundedCircle
//               style={{
//                 width: "100px",
//                 height: "100px",
//                 objectFit: "cover",
//                 cursor: "pointer",
//               }}
//               onClick={() =>
//                 document.getElementById("profileImageUpload").click()
//               }
//             />
//           </div>
//         </div>

//         <Form.Group>
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Enter name"
//           />
//         </Form.Group>

//         <Form.Group>
//           <Form.Label>About</Form.Label>
//           <Form.Control
//             as="textarea"
//             name="about"
//             value={formData.about}
//             onChange={handleChange}
//             placeholder="Enter description about the image"
//             rows={3}
//           />
//         </Form.Group>

//         <Button
//           variant="primary"
//           type="button"
//           onClick={handleSubmit}
//           disabled={loading}
//           className="mt-3"
//         >
//           {loading ? "Updating..." : "Update"}
//         </Button>
//       </Form>
//     </div>
//   );
// }

// export default UpdateDetails;
