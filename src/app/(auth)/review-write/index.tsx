import { Button } from "@/components/Button";
import { Screen } from "@/components/common/ui/Screen";
import { Header } from "@/components/Header";
import { StepIndicator } from "@/components/StepIndicator";
import { TicketBook } from "@/components/TicketBook";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, View } from "react-native";

// TODO: api 연동 후 Mock data 삭제
const mockTickets = [
    {
        id: "1",
        posterUrl: "https://via.placeholder.com/88x132",
        title: "비더슈탄트 [사롯데시어터]",
        date: "2024.06.21",
        theaterseat: "B구역 6열 4번",
        attendees: ["우선영", "염지은", "하은영", "윤혜원"],
    },
    {
        id: "2",
        posterUrl: "https://via.placeholder.com/88x132",
        title: "비더슈탄트 [사롯데시어터]",
        date: "2024.06.21",
        theaterseat: "B구역 6열 4번",
        attendees: ["우선영", "염지은", "하은영", "윤혜원"],
    },
    {
        id: "3",
        posterUrl: "https://via.placeholder.com/88x132",
        title: "비더슈탄트 [사롯데시어터]",
        date: "2024.06.21",
        theaterseat: "B구역 6열 4번",
        attendees: ["우선영", "염지은", "하은영", "윤혜원"],
    },
    {
        id: "4",
        posterUrl: "https://via.placeholder.com/88x132",
        title: "비더슈탄트 [사롯데시어터]",
        date: "2024.06.21",
        theaterseat: "B구역 6열 4번",
        attendees: ["우선영", "염지은", "하은영", "윤혜원"],
    },
];

export default function ReviewWritePage() {
    const router = useRouter();
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(
        null
    );

    const handleTicketSelect = (ticketId: string) => {
        setSelectedTicketId(ticketId);
    };

    const handleNext = () => {
        router.push("/review-write/step2");
    };

    return (
        <Screen
            header={
                <Header progress={(1 / 6) * 100}>
                    <Header.Back />
                    <Header.Center>후기글 추가</Header.Center>
                </Header>
            }
            fixedButton={
                <Button onPress={handleNext} disabled={!selectedTicketId}>
                    다음
                </Button>
            }
        >
            <StepIndicator
                currentStep={1}
                totalSteps={6}
                instruction="후기를 작성할 내역을 선택해주세요."
                className="my-7"
            />

            {/* Ticket List */}
            <FlatList
                data={mockTickets}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TicketBook
                        title={item.title}
                        date={item.date}
                        theaterseat={item.theaterseat}
                        attendees={item.attendees}
                        posterUrl={item.posterUrl}
                        active={selectedTicketId === item.id}
                        onPress={() => handleTicketSelect(item.id)}
                    />
                )}
                ItemSeparatorComponent={() => <View className="h-5" />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
            />
        </Screen>
    );
}
