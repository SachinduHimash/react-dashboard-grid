import React from "react";
export interface ProfileData {
    name: string;
    email?: string;
    avatarUrl?: string;
    avatarEmoji?: string;
    stats?: {
        label: string;
        value: string | number;
    }[];
    role?: string;
    badgeColor?: string;
}
export declare const ProfileCard: React.FC<{
    data: ProfileData;
}>;
