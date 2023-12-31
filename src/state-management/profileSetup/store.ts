import { create } from "zustand";

export interface ProfileSetupStages {
    avatar: boolean,
    roomSetup: boolean,
    loading: boolean,
};

interface AuthStore {
    profileStages: ProfileSetupStages;
    isSettingUpProfile: boolean;
    setAvatar: (avatarSet: boolean) => void;
    setRoomSetup: (roomSetup: boolean) => void;
    setLoading: (isLoading: boolean) => void;
    setSettingUpProfile: (isSettingUpProfile: boolean) => void;
}

// Zustand store to track profile setup stages
const useProfileSetupStore = create<AuthStore>(
    (set) => ({
        profileStages: {
            avatar: false,
            roomSetup: false,
            loading: false,
        },
        isSettingUpProfile: false,
        setAvatar: (avatarSet: boolean) => set((state) => ({ profileStages: { ...state.profileStages, avatar: avatarSet } })),
        setRoomSetup: (roomSetup: boolean) => set((state) => ({ profileStages: { ...state.profileStages, roomSetup: roomSetup } })),
        setLoading: (isLoading: boolean) => set((state) => ({ profileStages: { ...state.profileStages, loading: isLoading } })),
        setSettingUpProfile: (isSettingUpProfile: boolean) => set(() => ({ isSettingUpProfile: isSettingUpProfile })),
    }),
);

export default useProfileSetupStore;
