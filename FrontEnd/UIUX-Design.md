
# UI/UX 구상도

# Header(NavBar)
 추후에 My Page, 스크랩 등

# Body 1
 Airbnb, Booking.com 등의 숙소 검색을 벤치마킹 한 검색조건 및 검색창 구현.
 검색 후 Detail 페이지로 이동.

# Body 2
 Infinite Scroll을 이용해 현 위치로부터 가까운 순서대로 캠핑지를 보여준다.
 PC - 한 라인에 카드 3개
 Mobile - 한 라인에 카드 1개 를 보여주며,
 
 사진은 인스타그램을 벤치마킹해서 carousel 형태로 보여준다.

# Footer
 ..

=====================================================================

# 구현 순서

1. Body 2의 carousel 형태의 사진을 보여주는 카드 컴포넌트 구현
2. locationBasedList API 요청 및 imageList API 요청, response를 카드 컴포넌트에 뿌려주기.
3. 