const langBtn = document.getElementById("lang-button");

langBtn.addEventListener("change", ()=>changeLanguage(langBtn.value));

$( document ).ready(function(){
    changeLanguage("english");
})



const dict ={
    lang:["english", "japanese"],
    item:[
        ["update-title","Last update", "最終更新日"],
        ["update-date","17/Feb/2024","2024/02/17"],
        ["profile","Profile", "プロフィール"],
        ["skills","skills", "スキル"],
        ["experience","Experience", "経歴"],
        ["education","Education","学歴"],
        ["work-experience","Work Experience","職歴"],
        ["portfolio-prj","Projects","プロジェクト"],
        ["footer-profile","Profile","プロフィール"],
        ["footer-skills","skills", "スキル"],
        ["footer-experience","Experience", "経歴"],
        ["footer-portfolio-prj","Projects","プロジェクト"],
        ["footer-blog","BLOG","ブログ"],
        ["job-title","Web Front End Engineer","Webフロントエンドエンジニア"],
        ["home-address","Living in Adelaide, Australia","アデレード在住(オーストラリア)"],
        ["contact","Contact","連絡先"],
        ["front-end","Front-End","フロントエンド"],
        ["language-skills","Languages","言語"],
        ["certificates", "Certificates", "資格等"],
        ["education-ex-key-1","Key subject areas: Digital Communication","専門: デジタル通信"],
        ["education-ex-key-2","Key subject areas: Digital Communication","専門: デジタル通信"],
        ["education-ex-course-1","Bachelor Degree of Computer Science, Japan","学士号: 情報電気電子専攻, 日本"],
        ["education-ex-course-2","Master Degree of Computer Science, Japan","修士号: 情報専攻, 日本"],
        ["education-ex-course-3","Master Degree of Computer Science, Australia","修士号: コンピュータサイエンス, オーストラリア"],
        ["education-ex-current","Current","現在"],
        ["work-ex-company-1", "Application Software Engineer, Japan", "アプリケーションソフトウェアエンジニア"],
        ["work-ex-item-1","Windows application development (c#)","Windowsアプリケーション開発(C#)"],
        ["work-ex-item-2","Business planning and development","新規ビジネス企画・開発"],
        ["work-ex-item-3","Customer Support","カスタマーサポート"],
        ["portfolio-prj-name-1", "Focus shortly and deeply", "Focus shortly and deeply"],
        ["portfolio-prj-description-1","Pomodoro Timer maximizes your study efficiency by deviding 2 phases (25min study & 5min break).","勉強の効率を最大化させる、ポモドーロタイマー(25分の勉強+5分の休憩)で短く深く集中。"],
        ["portfolio-prj-go-1","Go to Project","プロジェクト"],
        ["portfolio-prj-release-1","released: Feb-'24","リリース: '24/02"]
    ]
}



const changeLanguage = (language) => {
    switch(language){
        case dict.lang[0]:
            for(let i=0; i<dict.item.length; i++){
                document.getElementById(dict.item[i][0]).innerText = dict.item[i][1];
            }
            break;
        case dict.lang[1]:
            for(let i=0; i<dict.item.length; i++){
                document.getElementById(dict.item[i][0]).innerText = dict.item[i][2];
            }
            break;
        default:
    }
}