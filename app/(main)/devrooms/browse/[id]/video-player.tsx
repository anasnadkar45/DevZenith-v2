"use client"
import "@stream-io/video-react-sdk/dist/css/styles.css";
import {
    Call,
    CallControls,
    CallParticipantsList,
    SpeakerLayout,
    StreamCall,
    StreamTheme,
    StreamVideo,
    StreamVideoClient,
    User,
} from '@stream-io/video-react-sdk';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Room } from "@prisma/client";
import { generateTokenAction } from "./actions";

interface SessionProps {
    id: string;
    name: string;
    image: string;
}

interface DevZenithVideoProps {
    room: Room;
    session: SessionProps;
}

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;

export const DevZenithVideo = ({ room, session }: DevZenithVideoProps) => {
    const [client, setClient] = useState<StreamVideoClient | null>(null);
    const [call, setCall] = useState<Call | null>(null);

    useEffect(() => {
        if (!room) return;
        if (!session.id) {
            return;
        }
        const userId = session.id;
        const client = new StreamVideoClient({
            apiKey,
            user: {
                id: userId,
                name: session.name ?? undefined,
                image: session.image ?? undefined,
            },
            tokenProvider: () => generateTokenAction(),
        });
        setClient(client);
        const call = client.call("default", room.id);
        call.join({ create: true });
        setCall(call);

        return () => {
            call
                .leave()
                .then(() => client.disconnectUser())
                .catch(console.error);
        };
    }, [room])
    return (
        client &&
        call && (
            <StreamVideo client={client}>
                <StreamCall call={call}>
                    <StreamTheme>
                        <SpeakerLayout />
                        <CallControls onLeave={() => {
                            redirect("/devrooms/browse");
                        }} />
                        <CallParticipantsList onClose={() => undefined} />
                    </StreamTheme>
                </StreamCall>
            </StreamVideo>
        )
    );
};