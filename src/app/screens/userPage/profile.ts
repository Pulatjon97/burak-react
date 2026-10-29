export type MemberProfile = {
  name: string;
  phone: string;
  address: string;
  description: string;
  image: string;
};

export const defaultMemberProfile: MemberProfile = {
  name: "Martin",
  phone: "821024694424",
  address: "no address",
  description: "no description",
  image: "/icons/default-user.svg",
};

const storageKey = "burak-member-profile";

export function loadMemberProfile(): MemberProfile {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved
      ? { ...defaultMemberProfile, ...JSON.parse(saved) }
      : defaultMemberProfile;
  } catch {
    return defaultMemberProfile;
  }
}

export function saveMemberProfile(profile: MemberProfile): void {
  localStorage.setItem(storageKey, JSON.stringify(profile));
}
