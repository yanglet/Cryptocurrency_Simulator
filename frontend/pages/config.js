const URL = 'http://localhost:9090/v1/api';

// 모든 가상화폐 조회
export const CRYPTOCURRENCY = {
    CRYPTOCURRENCY: `${URL}/cryptocurrencies`,
}

// 시세 캔들 조회
export const CANDLE = {
    DAYS: `${URL}/candles/days`,
    MINUTES: `${URL}/candles/minutes`,
    MONTHS: `${URL}/candles/months`,
    WEEKS: `${URL}/candles/weeks`,
}

// 관심 목록
export const LIKE = {
    LIKE_LIST: `${URL}/likes`,
    ADD_LIKE: `${URL}/likes/like`,
    DELETE_LIKE: `${URL}/likes/like`,
}

// 비트코인 투자 테스트
export const TEST = {
    TEST: `${URL}/tests`,
}

export const ORDER = {
    ORDER_LIST: `${URL}/orders`,
    ORDER: `${URL}/orders/order`,
}

// 회원 상세 정보
export const MEMBER = {
    ME: `${URL}/members/me`,
}