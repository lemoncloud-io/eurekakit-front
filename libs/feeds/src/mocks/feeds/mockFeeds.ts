import type { FeedView, ImageView } from '@lemoncloud/pets-socials-api';

const now = Date.now();

// 특정 범위의 랜덤 숫자 생성
const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// 피드 제목 샘플 데이터
const sampleTitles = [
    '멍!',
    '산책 가요~',
    '우리 강아지 너무 귀엽죠?',
    '오늘도 행복한 하루 보내세요 🐶',
    '우리 집 강아지가 오늘 처음으로 앉아 훈련을 성공했어요! 정말 기쁘네요 ♥',
    '강아지와 함께하는 특별한 하루, 공원에서의 산책과 애견카페에서의 즐거운 시간들을 담아보았습니다.',
    '우리 댕댕이가 오늘 동물병원에서 건강검진을 받았어요. 다행히 모든 검사 결과가 좋았고, 의사선생님께서 아주 건강하다고 칭찬해주셨답니다! 우리 강아지 앞으로도 쭉 건강하게 지내자 🐾',
    '반려동물과 함께하는 일상의 특별한 순간들, 아침에 일어나서 산책하고 장난감 가지고 놀아주고 간식도 주면서 보내는 하루하루가 정말 소중하네요. 앞으로도 우리 강아지와 이렇게 행복한 시간 보내고 싶어요! 오늘도 즐거운 하루 되세요 여러분 🐕✨',
];

// 피드 아이템 생성 함수
export const createFeedItem = (index: number, parentId?: string): FeedView => {
    const id = parentId ? `${parentId}_${(index + 1).toString()}` : (index + 1).toString();
    const userId = (100000 + index + 1).toString();

    // likeCount 자릿수 분포 (0 ~ 10,000,000)
    const likeRanges = [
        { min: 0, max: 9 }, // 1자리
        { min: 10, max: 99 }, // 2자리
        { min: 100, max: 999 }, // 3자리
        { min: 1000, max: 9999 }, // 4자리
        { min: 10000, max: 99999 }, // 5자리
        { min: 100000, max: 999999 }, // 6자리
        { min: 1000000, max: 9999999 }, // 7자리
    ];

    const randomRange = likeRanges[Math.floor(Math.random() * likeRanges.length)];
    const likeCount = getRandomNumber(randomRange.min, randomRange.max);

    // 이미지 개수 랜덤 (1-2개)
    const imageCount = Math.floor(Math.random() * 5);
    const images: ImageView[] = Array.from({ length: imageCount }, (_, i) => ({
        id: i.toString(),
        url: `https://picsum.photos/800/600?random=${index * 2 + i + 16}`,
    }));

    // 생성 시간 랜덤 (1분 ~ 1년)
    const timeRanges = [
        60 * 1000, // 1분
        60 * 60 * 1000, // 1시간
        24 * 60 * 60 * 1000, // 1일
        30 * 24 * 60 * 60 * 1000, // 30일
        365 * 24 * 60 * 60 * 1000, // 1년
    ];
    const randomTime = getRandomNumber(timeRanges[0], timeRanges[4]);

    return {
        id,
        text: sampleTitles[getRandomNumber(0, sampleTitles.length - 1)], // 랜덤하게 제목 선택
        likeCount,
        image$$: images,
        user$: {
            id: userId,
            nick: `닉네임${index + 1}`,
            image: `https://i.pravatar.cc/150?img=${index + 1}`,
        },
        createdAt: now - randomTime,
        $activity: {
            isLike: Boolean(Math.floor(Math.random() * 100) % 2),
        },
        childNo: Math.floor(Math.random() * 50),
        parentId,
    };
};

// 피드 리스트 생성 함수
export const generateFeeds = (count: number, parentId?: string): FeedView[] =>
    Array.from({ length: count }, (_, i) => createFeedItem(i, parentId));

export const feedList = generateFeeds(50).sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
