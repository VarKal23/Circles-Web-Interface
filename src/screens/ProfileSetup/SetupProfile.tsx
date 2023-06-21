import { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import RegistrationResponse from "../Registration/Interfaces/RegistrationResponse.tsx";
import { setDisplayName, setProfileAvatar, generateMxcUri } from "./apiClient.ts";
import ProfileSetupStages from "./ProfileSetupStages.tsx";
import { Container, Image } from "react-bootstrap";
import { BsPersonSquare } from "react-icons/bs";

interface Props {
    page: ProfileSetupStages;
    pageUpdate: React.Dispatch<React.SetStateAction<ProfileSetupStages>>;
    regResponse: RegistrationResponse | null;
}

const SetupProfile = ({ page, pageUpdate, regResponse }: Props) => {
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarURL, setAvatarURL] = useState<string | null>(null); // Change the type to string or null
    const name = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (avatarFile !== null) {
            setAvatarURL(URL.createObjectURL(avatarFile));
        }
    }, [avatarFile]);

    const onImageChange = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            setAvatarFile(event.target.files[0]);
        }
    };

    const handleClick = () => {
        if (name.current !== null) {
            console.log("Name: " + name.current.value);

            // Submitting display name and avatar to server
            setProfileAvatar(avatarFile, regResponse);
            console.log("Avatar file: " + avatarFile);
            console.log("Avatar URL: " + avatarURL);
            setDisplayName(name.current.value, regResponse, pageUpdate, page);

        } else {
            console.log("Name is null");
        }
    }
    return (
        <Container style={{ height: "90%" }}>
            {!page["loading"] && !page["avatar"] && (
                <>
                    <h1 className="title">Setup Profile</h1>
                    {avatarURL ? (
                        <Image className="profilePic" rounded src={avatarURL} alt="avatar" />
                    ) : (
                        <BsPersonSquare size={100} className="profilePic" />
                    )}
                    <input type="file" accept=".jpg, .jpeg" id="choosePhotoInput" className="choosePhotoInput" onChange={onImageChange} placeholder="Choose a photo from my device's library" />
                    <input type="text" className="displayName" ref={name} placeholder="name" />
                    <Button variant="primary" className="nextBtn" onClick={handleClick}>Next</Button>
                </>
            )}
        </Container>
    );
}

export default SetupProfile;

