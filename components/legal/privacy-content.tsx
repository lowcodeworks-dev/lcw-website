const CONTACT_EMAIL = 'info@lowcodeworks.consulting'

function En() {
  return (
    <>
      <div>
        <h2>1. Who we are</h2>
        <p>
          LowCodeWorks LTD (&quot;LowCodeWorks&quot;, &quot;we&quot;, &quot;us&quot;) is registered in South
          Korea and operates the website at lowcodeworks.consulting, including the free Digital
          Transformation Readiness Assessment. This policy explains what personal data we collect
          through this website, why we collect it, and what rights you have over it.
        </p>
      </div>

      <div>
        <h2>2. Information we collect</h2>
        <p><strong>Information you provide directly</strong> — when you take the Readiness Assessment or contact us, we collect:</p>
        <ul>
          <li>Your name, email address, and company name (company is optional)</li>
          <li>Any message you choose to leave us</li>
          <li>Your answers to the assessment questions and the resulting scores</li>
        </ul>
        <p><strong>Information collected automatically</strong> — when you browse the site, we (and the service providers listed below) may automatically collect:</p>
        <ul>
          <li>IP address, browser type, device type, and general location (country/city level)</li>
          <li>Pages visited, referring pages, and how you interact with the site</li>
          <li>A randomly generated session identifier used to measure the assessment funnel</li>
        </ul>
      </div>

      <div>
        <h2>3. How we use your information</h2>
        <ul>
          <li>To generate and email you your assessment results</li>
          <li>To respond to your enquiry and follow up about a potential engagement</li>
          <li>To operate, secure, and improve this website (including detecting spam and abuse)</li>
          <li>To understand, in aggregate, how visitors use the site</li>
        </ul>
        <p>We do not sell your personal data, and we do not use it for third-party advertising.</p>
      </div>

      <div>
        <h2>4. Cookies and similar technologies</h2>
        <p>
          We use a small number of cookies and browser-storage identifiers. Strictly necessary ones
          (for example, the security check that protects our contact form from spam) are always
          active, since the site can&apos;t function properly without them. Analytics cookies are
          only set after you accept them in the cookie banner shown on your first visit — you can
          decline them, and you can change your mind at any time by clearing your browser&apos;s
          site data for this domain.
        </p>
        <ul>
          <li><strong>Strictly necessary:</strong> Cloudflare Turnstile (spam/bot protection on our forms)</li>
          <li><strong>Analytics (consent-based):</strong> PostHog (see below)</li>
          <li><strong>Analytics (cookieless):</strong> Vercel Analytics, which does not use cookies or store any personally identifying data</li>
        </ul>
      </div>

      <div>
        <h2>5. Third parties we work with</h2>
        <p>We share the minimum data necessary with the following service providers, each acting under its own privacy policy and, where applicable, a data processing agreement with us:</p>
        <ul>
          <li><strong>Resend</strong> — sends the assessment result email to you and a notification email to us</li>
          <li><strong>PostHog</strong> (EU region) — product analytics, used only if you accept analytics cookies</li>
          <li><strong>Cloudflare Turnstile</strong> — verifies you&apos;re not a bot when submitting a form</li>
          <li><strong>Upstash</strong> — briefly stores your IP address to rate-limit form submissions and prevent abuse</li>
          <li><strong>Vercel Analytics</strong> — anonymous, cookieless page-view analytics</li>
          <li><strong>LCW Workspace</strong> (our internal CRM) — stores assessment submissions so we can follow up with you</li>
        </ul>
      </div>

      <div>
        <h2>6. Data retention</h2>
        <p>
          We keep assessment and contact submissions for as long as reasonably necessary to respond
          to you and maintain a record of prospective engagements, and delete them on request. Rate-limiting
          data is retained for at most one hour. Analytics data is retained according to each provider&apos;s
          standard retention period.
        </p>
      </div>

      <div>
        <h2>7. International data transfers</h2>
        <p>
          Our service providers may process data outside your home country, including in the EU and
          the United States. Where required, we rely on providers that offer appropriate safeguards
          such as Standard Contractual Clauses (PostHog processes analytics data in the EU region).
        </p>
      </div>

      <div>
        <h2>8. Your rights</h2>
        <p>
          Depending on where you live, you may have the right to access, correct, delete, or export
          your personal data, and to object to or restrict certain processing. If you are in the EU/EEA,
          these rights arise under the GDPR; if you are in South Korea, under the Personal Information
          Protection Act (PIPA). To exercise any of these rights, contact us at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </div>

      <div>
        <h2>9. Security</h2>
        <p>
          We use industry-standard measures — including HTTPS encryption, security headers, and
          rate limiting — to protect the data you share with us. No method of transmission or storage
          is completely secure, but we work to protect your data appropriately.
        </p>
      </div>

      <div>
        <h2>10. Children&apos;s privacy</h2>
        <p>This website is intended for business professionals and is not directed at children. We do not knowingly collect personal data from children.</p>
      </div>

      <div>
        <h2>11. Changes to this policy</h2>
        <p>We may update this policy from time to time. Material changes will be reflected by updating the &quot;Last updated&quot; date above.</p>
      </div>

      <div>
        <h2>12. Contact us</h2>
        <p>
          Questions about this policy or your data? Email{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, or write to LowCodeWorks LTD,
          306 Apgujeong-ro, Gangnam-gu, Seoul, Republic of Korea.
        </p>
      </div>
    </>
  )
}

function Ko() {
  return (
    <>
      <div>
        <h2>1. 당사 소개</h2>
        <p>
          LowCodeWorks LTD(&quot;LowCodeWorks&quot;, &quot;당사&quot;)는 대한민국에 등록된 법인으로,
          lowcodeworks.consulting 웹사이트와 무료 디지털 전환 준비도 평가(Digital Transformation
          Readiness Assessment)를 운영하고 있습니다. 본 방침은 당사가 이 웹사이트를 통해 수집하는
          개인정보의 종류, 수집 목적, 그리고 귀하가 이에 대해 가지는 권리를 설명합니다.
        </p>
      </div>

      <div>
        <h2>2. 수집하는 정보</h2>
        <p><strong>귀하가 직접 제공하는 정보</strong> — 귀하가 평가를 진행하거나 당사에 문의할 때, 당사는 다음 정보를 수집합니다:</p>
        <ul>
          <li>이름, 이메일 주소, 회사명(회사명은 선택 사항입니다)</li>
          <li>귀하가 남기고자 하는 메시지</li>
          <li>평가 질문에 대한 답변 및 그 결과 점수</li>
        </ul>
        <p><strong>자동으로 수집되는 정보</strong> — 귀하가 웹사이트를 이용하는 동안, 당사(및 아래에 명시된 서비스 제공업체)는 다음 정보를 자동으로 수집할 수 있습니다:</p>
        <ul>
          <li>IP 주소, 브라우저 종류, 기기 종류, 대략적인 위치(국가/도시 수준)</li>
          <li>방문한 페이지, 유입 경로, 사이트 이용 방식</li>
          <li>평가 진행 과정을 측정하기 위해 무작위로 생성되는 세션 식별자</li>
        </ul>
      </div>

      <div>
        <h2>3. 정보 이용 목적</h2>
        <ul>
          <li>평가 결과를 생성하여 이메일로 전달하기 위해</li>
          <li>문의에 답변하고 잠재적 협업 논의를 이어가기 위해</li>
          <li>웹사이트를 운영, 보호, 개선하기 위해(스팸 및 악용 탐지 포함)</li>
          <li>방문자들이 사이트를 전반적으로 어떻게 이용하는지 파악하기 위해</li>
        </ul>
        <p>당사는 귀하의 개인정보를 판매하지 않으며, 제3자 광고 목적으로 사용하지 않습니다.</p>
      </div>

      <div>
        <h2>4. 쿠키 및 유사 기술</h2>
        <p>
          당사는 소수의 쿠키 및 브라우저 저장 식별자를 사용합니다. 반드시 필요한 쿠키(예: 문의
          양식을 스팸으로부터 보호하는 보안 확인 절차)는 사이트가 제대로 작동하기 위해 항상
          활성화되어 있습니다. 분석용 쿠키는 첫 방문 시 표시되는 쿠키 배너에서 귀하가 동의한
          경우에만 설정되며, 동의를 거부할 수 있고 언제든지 이 도메인의 브라우저 사이트 데이터를
          삭제하여 결정을 변경할 수 있습니다.
        </p>
        <ul>
          <li><strong>반드시 필요한 쿠키:</strong> Cloudflare Turnstile(양식의 스팸/봇 방지)</li>
          <li><strong>분석 쿠키(동의 기반):</strong> PostHog(아래 참조)</li>
          <li><strong>분석(쿠키 미사용):</strong> Vercel Analytics — 쿠키를 사용하지 않으며 개인 식별 정보를 저장하지 않습니다</li>
        </ul>
      </div>

      <div>
        <h2>5. 협력하는 제3자</h2>
        <p>당사는 아래 서비스 제공업체와 필요한 최소한의 정보만을 공유하며, 각 업체는 자체 개인정보 처리방침을 따르고, 해당하는 경우 당사와 데이터 처리 계약을 체결하고 있습니다:</p>
        <ul>
          <li><strong>Resend</strong> — 귀하에게 평가 결과 이메일을 발송하고 당사에 알림 이메일을 전송</li>
          <li><strong>PostHog</strong>(EU 리전) — 제품 분석, 귀하가 분석 쿠키에 동의한 경우에만 사용</li>
          <li><strong>Cloudflare Turnstile</strong> — 양식 제출 시 봇이 아님을 확인</li>
          <li><strong>Upstash</strong> — 양식 제출 속도 제한 및 악용 방지를 위해 IP 주소를 짧은 시간 동안 저장</li>
          <li><strong>Vercel Analytics</strong> — 익명, 쿠키 미사용 페이지 방문 분석</li>
          <li><strong>LCW Workspace</strong>(당사 내부 CRM) — 평가 제출 내용을 저장하여 귀하에게 후속 연락을 드리기 위함</li>
        </ul>
      </div>

      <div>
        <h2>6. 보유 기간</h2>
        <p>
          당사는 귀하에게 답변하고 잠재 고객 기록을 유지하기 위해 합리적으로 필요한 기간 동안 평가
          및 문의 제출 내용을 보관하며, 요청 시 삭제합니다. 속도 제한 데이터는 최대 1시간 동안
          보관됩니다. 분석 데이터는 각 제공업체의 표준 보유 기간에 따라 보관됩니다.
        </p>
      </div>

      <div>
        <h2>7. 국외 이전</h2>
        <p>
          당사의 서비스 제공업체는 EU 및 미국 등 귀하의 거주 국가 외부에서 데이터를 처리할 수
          있습니다. 필요한 경우, 당사는 표준계약조항(Standard Contractual Clauses)과 같은 적절한
          보호 조치를 제공하는 업체를 이용합니다(PostHog는 분석 데이터를 EU 리전에서 처리합니다).
        </p>
      </div>

      <div>
        <h2>8. 귀하의 권리</h2>
        <p>
          거주 지역에 따라, 귀하는 본인의 개인정보에 대한 열람, 정정, 삭제, 이전을 요청하고, 특정
          처리에 대해 이의를 제기하거나 제한을 요청할 권리를 가질 수 있습니다. EU/EEA 거주자의
          경우 이러한 권리는 GDPR에 따라, 대한민국 거주자의 경우 개인정보 보호법(PIPA)에 따라
          발생합니다. 이러한 권리를 행사하려면{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>으로 문의해 주세요.
        </p>
      </div>

      <div>
        <h2>9. 보안</h2>
        <p>
          당사는 HTTPS 암호화, 보안 헤더, 속도 제한 등 업계 표준 조치를 통해 귀하가 제공한 정보를
          보호합니다. 전송이나 저장 방식 중 완전히 안전한 방법은 없지만, 당사는 귀하의 정보를
          적절히 보호하기 위해 노력하고 있습니다.
        </p>
      </div>

      <div>
        <h2>10. 아동의 개인정보</h2>
        <p>본 웹사이트는 비즈니스 전문가를 대상으로 하며 아동을 대상으로 하지 않습니다. 당사는 아동의 개인정보를 고의로 수집하지 않습니다.</p>
      </div>

      <div>
        <h2>11. 본 방침의 변경</h2>
        <p>당사는 본 방침을 수시로 업데이트할 수 있습니다. 중대한 변경 사항은 위의 &quot;최종 업데이트&quot; 날짜를 갱신하여 반영합니다.</p>
      </div>

      <div>
        <h2>12. 문의하기</h2>
        <p>
          본 방침이나 귀하의 정보에 대해 궁금한 점이 있으신가요?{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>으로 이메일을 보내주시거나, 대한민국
          서울특별시 강남구 압구정로 306, LowCodeWorks LTD로 서면 문의해 주세요.
        </p>
      </div>
    </>
  )
}

function Ja() {
  return (
    <>
      <div>
        <h2>1. 当社について</h2>
        <p>
          LowCodeWorks LTD(以下「LowCodeWorks」または「当社」)は韓国に登録された法人であり、
          lowcodeworks.consulting のウェブサイトおよび無料のデジタルトランスフォーメーション準備度
          アセスメントを運営しています。本ポリシーでは、当社が本ウェブサイトを通じて収集する個人情報の
          内容、その収集目的、およびお客様が有する権利について説明します。
        </p>
      </div>

      <div>
        <h2>2. 収集する情報</h2>
        <p><strong>お客様が直接提供する情報</strong> — アセスメントの受検またはお問い合わせの際、当社は以下の情報を収集します:</p>
        <ul>
          <li>氏名、メールアドレス、会社名(会社名は任意です)</li>
          <li>お客様が残されたメッセージ</li>
          <li>アセスメントの質問への回答およびその結果スコア</li>
        </ul>
        <p><strong>自動的に収集される情報</strong> — お客様が本サイトを閲覧する際、当社(および以下に記載のサービス提供者)は以下の情報を自動的に収集する場合があります:</p>
        <ul>
          <li>IPアドレス、ブラウザの種類、デバイスの種類、おおよその所在地(国・都市レベル)</li>
          <li>閲覧ページ、参照元ページ、サイトの利用状況</li>
          <li>アセスメントの進行状況を測定するためにランダムに生成されるセッション識別子</li>
        </ul>
      </div>

      <div>
        <h2>3. 情報の利用目的</h2>
        <ul>
          <li>アセスメント結果を生成し、メールでお送りするため</li>
          <li>お問い合わせへの回答および今後の協業についてのご連絡のため</li>
          <li>本ウェブサイトの運営、保護、改善のため(スパムや不正利用の検知を含む)</li>
          <li>訪問者全体のサイト利用状況を把握するため</li>
        </ul>
        <p>当社はお客様の個人情報を販売することはなく、第三者への広告目的で使用することもありません。</p>
      </div>

      <div>
        <h2>4. Cookie(クッキー)および類似技術</h2>
        <p>
          当社は少数のCookieおよびブラウザストレージ識別子を使用しています。必須のCookie(例:
          お問い合わせフォームをスパムから保護するセキュリティチェック)は、サイトが正常に機能する
          ために常に有効になっています。分析用Cookieは、初回訪問時に表示されるCookieバナーで
          お客様が同意された場合にのみ設定され、同意を拒否することも、後からこのドメインのブラウザ
          サイトデータを削除することでいつでも選択を変更することも可能です。
        </p>
        <ul>
          <li><strong>必須のCookie:</strong> Cloudflare Turnstile(フォームのスパム・ボット対策)</li>
          <li><strong>分析用Cookie(同意ベース):</strong> PostHog(下記参照)</li>
          <li><strong>分析(Cookie不使用):</strong> Vercel Analytics — Cookieを使用せず、個人を特定できる情報も保存しません</li>
        </ul>
      </div>

      <div>
        <h2>5. 連携する第三者</h2>
        <p>当社は以下のサービス提供者と必要最小限の情報のみを共有しており、各社はそれぞれのプライバシーポリシーに基づき、該当する場合は当社とのデータ処理契約のもとで対応しています:</p>
        <ul>
          <li><strong>Resend</strong> — アセスメント結果メールのお客様への送信、および当社宛の通知メールの送信</li>
          <li><strong>PostHog</strong>(EUリージョン) — プロダクト分析。分析用Cookieに同意いただいた場合のみ使用</li>
          <li><strong>Cloudflare Turnstile</strong> — フォーム送信時にボットでないことを確認</li>
          <li><strong>Upstash</strong> — フォーム送信のレート制限と不正利用防止のため、IPアドレスを短時間保存</li>
          <li><strong>Vercel Analytics</strong> — 匿名かつCookieを使用しないページビュー分析</li>
          <li><strong>LCW Workspace</strong>(当社の社内CRM) — アセスメントの送信内容を保存し、お客様へのフォローアップに使用</li>
        </ul>
      </div>

      <div>
        <h2>6. データの保持期間</h2>
        <p>
          当社は、お客様への対応および見込み案件の記録維持に合理的に必要な期間、アセスメントおよび
          お問い合わせの送信内容を保持し、ご要望があれば削除します。レート制限用データは最大1時間
          保持されます。分析データは各提供者の標準的な保持期間に従います。
        </p>
      </div>

      <div>
        <h2>7. 国際的なデータ移転</h2>
        <p>
          当社のサービス提供者は、EUや米国など、お客様の居住国以外でデータを処理する場合があります。
          必要な場合、当社は標準契約条項(Standard Contractual Clauses)など適切な保護措置を提供する
          事業者を利用します(PostHogは分析データをEUリージョンで処理します)。
        </p>
      </div>

      <div>
        <h2>8. お客様の権利</h2>
        <p>
          お住まいの地域により、お客様はご自身の個人情報へのアクセス、訂正、削除、データポータビリティ
          を求める権利、および特定の処理に異議を唱えたり制限を求めたりする権利を有する場合があります。
          EU/EEA にお住まいの場合はGDPRに基づき、韓国にお住まいの場合は個人情報保護法(PIPA)に
          基づき、これらの権利が発生します。これらの権利を行使される場合は{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> までご連絡ください。
        </p>
      </div>

      <div>
        <h2>9. セキュリティ</h2>
        <p>
          当社は、HTTPS暗号化、セキュリティヘッダー、レート制限など、業界標準の対策を用いてお客様から
          ご提供いただいた情報を保護しています。送信や保存の方法に完全に安全なものはありませんが、
          当社はお客様の情報を適切に保護するよう努めています。
        </p>
      </div>

      <div>
        <h2>10. 児童のプライバシー</h2>
        <p>本ウェブサイトはビジネス専門家を対象としており、児童を対象としたものではありません。当社は児童の個人情報を意図的に収集することはありません。</p>
      </div>

      <div>
        <h2>11. 本ポリシーの変更</h2>
        <p>当社は本ポリシーを随時更新することがあります。重要な変更がある場合は、上記の「最終更新日」を更新することで反映します。</p>
      </div>

      <div>
        <h2>12. お問い合わせ</h2>
        <p>
          本ポリシーまたはお客様の情報についてご質問がございましたら、{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> までメールでご連絡いただくか、
          LowCodeWorks LTD(住所:大韓民国ソウル特別市江南区狎鴎亭路306)まで書面にてお問い合わせください。
        </p>
      </div>
    </>
  )
}

export function PrivacyContent({ locale }: { locale: string }) {
  if (locale === 'ko') return <Ko />
  if (locale === 'ja') return <Ja />
  return <En />
}
