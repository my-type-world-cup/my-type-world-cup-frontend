  <img src="https://velog.velcdn.com/images/wns450/post/4b406b41-4389-4485-a2a6-2e10dc758a08/image.png" width="300" height="180">

## 💁 이상형 월드컵

모바일 전용 이상형 월드컵
스크래핑을 통해 이미지를 업로드 할 수 있다.

## 📆 프로젝트 기간

2023.04 ~ 2023.08 (1차 개발)  
2023.08 ~ 2023.10 (리펙토링)

## **🛠️ 기술 스택**

### 프론트엔드

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=Recoil&logoColor=white"> <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">

<br/>

### 주요 기능

### 에디터

<details open>
<summary>로컬 이미지 업로드</summary>

로컬에 이미지가 존재한다면 업로드할 수 있습니다. 이는 바이너리 데이터로 받아오기 때문에 더 빠른 속도로 업로드 가능합니다.

![로컬 업로드](/public/gif/local-upload.gif)

</details>

<details open>
<summary>검색을 통한 이미지 업로드</summary>

검색을 통해 이미지를 가져와 월드컵에 추가할 수 있습니다. 스크래핑을 통해 받아온 URL을 Blob 객체로 변환하여 사용합니다.

![검색을 통한 이미지 업로드](/public/gif/search-upload.gif)

</details>

<details open>
<summary>사진 편집 기능</summary>

사진을 확대하거나 돌릴 수 있습니다.

![사진 편집](/public/gif/fix-picture.gif)

</details>

<details open>
<summary>사진 삭제</summary>

월드컵에 올라온 사진을 삭제하는 기능입니다.

![사진 삭제](/public/gif/delete-picture.gif)

</details>

### 게임

<details open>
<summary>월드컵 게임 영상</summary>

수를 지정하고, 상하 클릭을 통해 이상형을 선택할 수 있습니다. 게임이 끝나면 게임 결과로 이동합니다.

![인게임 영상](/public/gif/ingame.gif)

</details>

<details open>
<summary>랭킹 반영</summary>

투표를 완료하면 랭킹을 업데이트 합니다.

![랭킹 반영](/public/gif/ranking.gif)

</details>

<details open>
<summary>사진 확대</summary>

랭킹, 월드컵 만들기에서 사진 확대기능을 활용할 수 있습니다. 기존 사진은 저화질이지만 확대 사진은 고화질입니다.

![사진 확대 기능](/public/gif/zoomin.gif)

</details>

<details open>
<summary>댓글 기능</summary>

![댓글](/public/gif/comment.gif)

</details>

### 메인

<details open>
<summary>무한 스크롤 구현</summary>

검색 및 필터링 기능을 통해 원하는 것을 찾을 수 있습니다.

![검색 및 필터링](/public/gif/search-filter.gif)

</details>

<details open>
<summary>GNB</summary>

적은 공간을 활용하기 위해 오른쪽 상단에 메뉴를 만들었습니다.

![모달 형식 메뉴바](/public/gif/gnb.gif)

</details>

<details open>
<summary>로그인 및 스켈레톤</summary>

구글 Oauth 통한 로그인이 가능합니다. 토큰 저장시, 스켈레톤을 활용하여 자연스러운 화면전환을 만들었습니다.

![로그인 및 스켈레톤](/public/gif/login.gif)

</details>

<details open>
<summary>이상형 공유 기능</summary>

공유하기 버튼을 누르면 해당 게임의 url을 복사합니다.

![공유 기능](/public/gif/share.gif)

</details>

```

```
