import { useState, type ChangeEvent, type FormEvent } from "react";
import { Box } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Button from "@mui/material/Button";
import type { MemberProfile } from "./profile";

type SettingsProps = {
  profile: MemberProfile;
  onSave: (profile: MemberProfile) => void;
};

export function Settings({ profile, onSave }: SettingsProps) {
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.currentTarget;
    setForm((current) => ({ ...current, [name]: value }));
    setSaved(false);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (!file || !["image/jpeg", "image/png"].includes(file.type)) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setForm((current) => ({ ...current, image: reader.result as string }));
        setSaved(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(form);
    setSaved(true);
  };

  return (
    <Box component="form" className={"settings"} onSubmit={handleSubmit}>
      <Box className={"member-media-frame"}>
        <img src={form.image} className={"mb-image"} alt="Member profile preview" />
        <div className={"media-change-box"}>
          <span>Upload image</span>
          <p>JPG, JPEG, PNG formats only!</p>
          <div className={"up-del-box"}>
            <Button component="label">
              <CloudDownloadIcon />
              <input
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleImageChange}
                hidden
              />
            </Button>
          </div>
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Username</label>
          <input
            className={"spec-input mb-nick"}
            type="text"
            placeholder="Username"
            value={form.name}
            onChange={handleFieldChange}
            name="memberNick"
          />
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"short-input"}>
          <label className={"spec-label"}>Phone</label>
          <input
            className={"spec-input mb-phone"}
            type="text"
            placeholder="Phone"
            value={form.phone}
            onChange={handleFieldChange}
            name="memberPhone"
          />
        </div>
        <div className={"short-input"}>
          <label className={"spec-label"}>Address</label>
          <input
            className={"spec-input  mb-address"}
            type="text"
            placeholder="Address"
            value={form.address}
            onChange={handleFieldChange}
            name="memberAddress"
          />
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Description</label>
          <textarea
            className={"spec-textarea mb-description"}
            placeholder="Description"
            value={form.description}
            onChange={handleFieldChange}
            name="memberDesc"
          />
        </div>
      </Box>
      <Box className={"save-box"}>
        <Button type="submit" variant={"contained"}>
          {saved ? "Saved" : "Save"}
        </Button>
      </Box>
    </Box>
  );
}
