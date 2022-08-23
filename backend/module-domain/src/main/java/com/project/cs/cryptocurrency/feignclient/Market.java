package com.project.cs.cryptocurrency.feignclient;

import lombok.Getter;

@Getter
public enum Market {
    비트코인("Bitcoin", "KRW-BTC", 1L),
    이더리움("Ethereum", "KRW-ETH", 2L),
    네오("NEO", "KRW-NEO", 3L),
    메탈("Metal", "KRW-MTL", 4L),
    리플("Ripple", "KRW-XRP", 5L),
    이더리움클래식("Ethereum Classic", "KRW-ETC", 6L),
    오미세고("OmiseGo", "KRW-OMG", 7L),
    스테이터스네트워크토큰("Status Network Token", "KRW-SNT", 8L),
    웨이브("Waves", "KRW-WAVES", 9L),
    넴("NEM", "KRW-XEM", 10L),
    퀀텀("Qtum", "KRW-QTUM", 11L),
    리스크("Lisk", "KRW-LSK", 12L),
    스팀("Steem", "KRW-STEEM", 13L),
    스텔라루멘("Lumen", "KRW-XLM", 14L),
    아더("Ardor", "KRW-ARDR", 15L),
    아크("Ark", "KRW-ARK", 16L),
    스토리지("Storj", "KRW-STORJ", 17L),
    그로스톨코인("Groestlcoin", "KRW-GRS", 18L),
    어거("Augur", "KRW-REP", 19L),
    에이다("Ada", "KRW-ADA", 20L),
    스팀달러("SteemDollars", "KRW-SBD", 21L),
    파워렛저("Power ledger", "KRW-POWR", 22L),
    비트코인골드("Bitcoin Gold", "KRW-BTG", 23L),
    아이콘("Icon", "KRW-ICX", 24L),
    이오스("EOS", "KRW-EOS", 25L),
    트론("TRON", "KRW-TRX", 26L),
    시아코인("Siacoin", "KRW-SC", 27L),
    온톨로지("Ontology", "KRW-ONT", 28L),
    질리카("Zilliqa", "KRW-ZIL", 29L),
    폴리매쓰("Polymath", "KRW-POLY", 30L),
    제로엑스("0x Protocol", "KRW-ZRX", 31L),
    룸네트워크("Loom Network", "KRW-LOOM", 32L),
    비트코인캐시("Bitcoin Cash", "KRW-BCH", 33L),
    베이직어텐션토큰("Basic Attention Token", "KRW-BAT", 34L),
    아이오에스티("IOST", "KRW-IOST", 35L),
    리퍼리움("Refereum", "KRW-RFR", 36L),
    시빅("Civic", "KRW-CVC", 37L),
    에브리피디아("Everipedia", "KRW-IQ", 38L),
    아이오타("IOTA", "KRW-IOTA", 39L),
    메인프레임("Mainframe", "KRW-MFT", 40L),
    온톨로지가스("ONG", "KRW-ONG", 41L),
    가스("GAS", "KRW-GAS", 42L),
    센티넬프로토콜("Sentinel Protocol", "KRW-UPP", 43L),
    엘프("aelf", "KRW-ELF", 44L),
    카이버네트워크("Kyber Network", "KRW-KNC", 45L),
    비트코인에스브이("Bitcoin SV", "KRW-BSV", 46L),
    쎄타토큰("Theta Token", "KRW-THETA", 47L),
    쿼크체인("QuarkChain", "KRW-QKC", 48L),
    비트토렌트("BitTorrent", "KRW-BTT", 49L),
    모스코인("Moss Coin", "KRW-MOC", 50L),
    엔진코인("Enjin", "KRW-ENJ", 51L),
    쎄타퓨엘("Theta Fuel", "KRW-TFUEL", 52L),
    디센트럴랜드("Decentraland", "KRW-MANA", 53L),
    앵커("Ankr", "KRW-ANKR", 54L),
    아르고("Aergo", "KRW-AERGO", 55L),
    코스모스("Cosmos", "KRW-ATOM", 56L),
    썬더코어("ThunderCore", "KRW-TT", 57L),
    캐리프로토콜("Carry Protocol", "KRW-CRE", 58L),
    무비블록("MovieBloc", "KRW-MBL", 59L),
    왁스("WAX", "KRW-WAXP", 60L),
    헤데라("Hedera", "KRW-HBAR", 61L),
    메디블록("MediBloc", "KRW-MED", 62L),
    밀크("MiL.k", "KRW-MLK", 63L),
    에스티피("Standard Tokenization Protocol", "KRW-STPT", 64L),
    오브스("Orbs", "KRW-ORBS", 65L),
    비체인("VeChain", "KRW-VET", 66L),
    칠리즈("Chiliz", "KRW-CHZ", 67L),
    스톰엑스("StormX", "KRW-STMX", 68L),
    디카르고("dKargo", "KRW-DKA", 69L),
    하이브("Hive", "KRW-HIVE", 70L),
    카바("Kava", "KRW-KAVA", 71L),
    아하토큰("AhaToken", "KRW-AHT", 72L),
    체인링크("Chainlink", "KRW-LINK", 73L),
    테조스("Tezos", "KRW-XTZ", 74L),
    보라("BORA", "KRW-BORA", 75L),
    저스트("JUST", "KRW-JST", 76L),
    크로노스("Cronos", "KRW-CRO", 77L),
    톤("TON", "KRW-TON", 78L),
    솔라("SXP", "KRW-SXP", 79L),
    헌트("HUNT", "KRW-HUNT", 80L),
    플레이댑("PlayDapp", "KRW-PLA", 81L),
    폴카닷("Polkadot", "KRW-DOT", 82L),
    세럼("Serum", "KRW-SRM", 83L),
    엠블("MVL", "KRW-MVL", 84L),
    스트라티스("Stratis", "KRW-STRAX", 85L),
    알파쿼크("Alpha Quark Token", "KRW-AQT", 86L),
    골렘("Golem", "KRW-GLM", 87L),
    썸씽("SOMESING", "KRW-SSX", 88L),
    메타디움("Metadium", "KRW-META", 89L),
    피르마체인("FirmaChain", "KRW-FCT2", 90L),
    코박토큰("Cobak Token", "KRW-CBK", 91L),
    샌드박스("The Sandbox", "KRW-SAND", 92L),
    휴먼스케이프("Humanscape", "KRW-HUM", 93L),
    도지코인("Dogecoin", "KRW-DOGE", 94L),
    스트라이크("Strike", "KRW-STRK", 95L),
    펀디엑스("Pundi X", "KRW-PUNDIX", 96L),
    플로우("Flow", "KRW-FLOW", 97L),
    던프로토콜("Dawn Protocol", "KRW-DAWN", 98L),
    엑시인피니티("Axie Infinity", "KRW-AXS", 99L),
    스택스("Stacks", "KRW-STX", 100L),
    이캐시("eCash", "KRW-XEC", 101L),
    솔라나("Solana", "KRW-SOL", 102L),
    폴리곤("Polygon", "KRW-MATIC", 103L),
    누사이퍼("Nucypher", "KRW-NU", 104L),
    에이브("Aave", "KRW-AAVE", 105L),
    일인치네트워크("1inch Network", "KRW-1INCH", 106L),
    알고랜드("Algorand", "KRW-ALGO", 107L),
    니어프로토콜("NEAR Protocol", "KRW-NEAR", 108L),
    위믹스("Wemix", "KRW-WEMIX", 109L),
    아발란체("Avalanche", "KRW-AVAX", 110L),
    쓰레스홀드("Threshold", "KRW-T", 111L),
    셀로("Celo", "KRW-CELO", 112L),
    스테픈("Stepn", "KRW-GMT", 113L);

    private String english_name;
    private String marketCode;
    private Long id;

    Market(String english_name, String marketCode, Long id) {
        this.english_name = english_name;
        this.marketCode = marketCode;
        this.id = id;
    }

    public static String getAllMarketCode(){
        String result = "";

        for(Market m : Market.values()){
            result += m.getMarketCode() + ",";
        }

        return result.substring(0, result.length() - 1);
    }

    public static Long getId(String marketCode){
        for(Market m : Market.values()){
            if(marketCode.equals(m.getMarketCode())){
                return m.getId();
            }
        }
        return -1L;
    }
}
