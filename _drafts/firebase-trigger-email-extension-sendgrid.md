firestore collection: emails
[handlebar](https://handlebarsjs.com/) templates collection: email_templates


Settings/API Keys https://app.sendgrid.com/settings/api_keys
mmb-demos.firebase-function-sendgrid-email
API Key ID: SyOBTRBlRSegQbbYK6rn_A


[Email AI/Integration guide/Choose STMP Relay](https://app.sendgrid.com/guide/integrate/langs/smtp)
smtps://apikey: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@smtp.sendgrid.net:465

on doc
from: Miguel Da Costa <contact@meumobi.com>

org.logo
item.pictureUrl => img not follow redirect then should prevent imgflow, can temporary save on new field (media?) firestorage url
item.title
item.body
item.id

url of post (more details) How to translate label ? => No need, static on tpl. Each tpl should have a lang redefined

strip tags on body, get only 1st p (how?)


<p class="ql-align-center"><strong>Feriado do Dia do Trabalho</strong></p><p><br></p><p>Devido ao feriado de Dia de Trabalho, celebrado nesta sexta-feira, 1º de maio, não haverá expediente na Companhia. </p><p><br></p><p>Retornaremos ao trabalho a partir das 8h30, na segunda-feira (3).</p><p>&nbsp;</p><p>Aproveite seu dia de descanso em casa! </p><p><br></p><p><em>Entenda a data: é uma homenagem ao esforço dos trabalhadores dos Estados Unidos, que, em 1º de maio de 1886, foram às ruas das maiores cidades do país para pedir redução da carga horária máxima de trabalho por dia. A luta foi reconhecida rapidamente na Europa e a data começou a ser marcada por cerimônias e manifestações. No Brasil, o Dia do Trabalho é celebrado desde 1925.</em></p><p><br></p>

```xml
<mjml>
  <mj-head>
    <mj-title>Discount Light</mj-title>
    <mj-attributes>
      <mj-all font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"></mj-all>
      <mj-text font-weight="400" font-size="20px" color="#000000" line-height="24px" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"></mj-text>
    </mj-attributes>
    <mj-style inline="inline">
      .body-section { -webkit-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15); -moz-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15); box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15); }
    </mj-style>
  </mj-head>
  <mj-body background-color="#E7E7E7" width="600px">

    <mj-wrapper background-color="#FFFFFE" padding-top="0" padding-bottom="0" css-class="body-section">
      <mj-hero padding-left="10px">
        <mj-image width="144px" align="left" src="https://imageflow.meumobi.com/nfmb/zUrm?width=1024&scale=both&format=jpg" href="https://web.infomobi.app" alt=""></mj-image>
      </mj-hero>

      <mj-section padding-bottom="0" padding-top="0">
        <mj-column>
          <mj-image src="https://firebasestorage.googleapis.com/v0/b/infomobi-v4.appspot.com/o/1588248966155_Dia%20do%20Trabalho%201.jpg?alt=media&token=71f33cef-e772-40d5-b78d-1a444b052df2" align="center" alt="" padding="0" href="https://google.com" />
        </mj-column>
      </mj-section>
      <mj-section>
        <mj-column width="100%">
          <mj-text color="#212b35" font-weight="bold" font-size="20px">
            Croft's in Austin is opening December 20th
          </mj-text>
          <mj-text>Devido ao feriado de Dia de Trabalho, celebrado nesta sexta-feira, 1º de maio, não haverá expediente na Companhia.</mj-text>
          <mj-button background-color="#fec500" align="center" color="#222" font-size="17px" font-weight="bold" href="https://web.infomobi.app/items/detail/kRmOZLzNW8jUEHw3exEQ" width="200px">
            Ler mais
          </mj-button>
        </mj-column>
      </mj-section>
    </mj-wrapper>
    <mj-section></mj-section>
  </mj-body>
</mjml>
```



Helbor ================

```xml
<mjml>
  <mj-head>
    <mj-title>Discount Light</mj-title>
    <mj-attributes>
      <mj-all font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"></mj-all>
      <mj-text font-weight="400" font-size="20px" color="#000000" line-height="24px" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"></mj-text>
      <mj-section padding="8px 0"></mj-section>
    </mj-attributes>
  </mj-head>
  <mj-style inline="inline">
    .body-section { -webkit-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15); -moz-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15); box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15); }
  </mj-style>
  </mj-head>
  <mj-body background-color="#E7E7E7" width="600px">

    <mj-wrapper background-color="#FFFFFE" padding-top="0" padding-bottom="0" css-class="body-section">
      <mj-hero padding-left="10px">
        <mj-image width="144px" align="left" src="https://storage.googleapis.com/infomobi-v4.appspot.com/header-helbor2-clean.png?width=1024&scale=both&format=jpg" href="https://web.infomobi.app" alt=""></mj-image>
      </mj-hero>

      <mj-section padding-bottom="0" padding-top="0">
        <mj-column>
          <mj-image src="https://firebasestorage.googleapis.com/v0/b/infomobi-v4.appspot.com/o/1588248966155_Dia%20do%20Trabalho%201.jpg?alt=media&token=71f33cef-e772-40d5-b78d-1a444b052df2" align="center" alt="" padding="0" href="https://google.com" />
        </mj-column>
      </mj-section>
      <mj-section>
        <mj-column width="100%">
          <mj-text color="#212b35" font-weight="bold" font-size="20px">
            Feriado: Dia do Trabalho
          </mj-text>
          <mj-section>
            <mj-column width="11%">
              <mj-image padding-right="0px" padding-left="25px" align="left" width="70px" href="https://twitter.com/MrJustaine" src="https://cdn.recast.ai/newsletter/justine.png"></mj-image>
            </mj-column>
            <mj-column width="89%">
              <mj-text padding="0 25px">
                <p style="color:#BDBDBD; line-height: 9px"> Justine - <a href="https://recast.ai?ref=newsletter" style="color: #3498DB;">
              Recast.AI
            </a> team </p>
                <p style="font-style: italic; color:#BDBDBD; line-height: 9px"> Your light in the storm </p>
              </mj-text>
            </mj-column>
          </mj-section>
          <mj-text>Devido ao feriado de Dia de Trabalho, celebrado nesta sexta-feira, 1º de maio, não haverá expediente na Companhia.</mj-text>
          <mj-button background-color="#fec500" align="center" color="#222" font-size="17px" font-weight="bold" href="https://web.infomobi.app/items/detail/kRmOZLzNW8jUEHw3exEQ" width="200px">
            Ler mais
          </mj-button>
          <mj-divider border-width="1px" border-color="#E0E0E0"></mj-divider>
          <mj-text>Lorem ipsum</mj-text>mj-text>
        </mj-column>
      </mj-section>



    </mj-wrapper>
    <mj-section>
      <mj-column width="65%">
        <mj-image align="left" width="150px" href="https://recast.ai?ref=newsletter" src="https://cdn.recast.ai/newsletter/recast-ai-01.png"></mj-image>
      </mj-column>
      <mj-column width="35%">
        <mj-table>
          <tr style="list-style: none;line-height:1">
            <td> <a href="https://twitter.com/RecastAI">
                  <img width="25" src="https://cdn.recast.ai/newsletter/twitter.png" />
                </a> </td>
            <td> <a href="https://www.facebook.com/recastAI">
                  <img width="25" src="https://cdn.recast.ai/newsletter/facebook.png" />
                </a> </td>
            <td> <a href="https://medium.com/@RecastAI">
                  <img width="25" src="https://cdn.recast.ai/newsletter/medium.png" />
                </a> </td>
            <td> <a href="https://www.youtube.com/channel/UCA0UZlR8crpgwFiVaSTbVWw">
                  <img width="25" src="https://cdn.recast.ai/newsletter/youtube.png" />
                </a> </td>
            <td> <a href="https://plus.google.com/u/0/+RecastAi">
                  <img width="25" src="https://cdn.recast.ai/newsletter/google%2B.png" />
                </a> </td>
          </tr>
        </mj-table>
      </mj-column>
    </mj-section>
    <mj-section padding="10px 0 20px 0">
      <mj-column>
        <mj-text align="center" color="#9B9B9B" font-size="11px"><a href="#" style="color: #9B9B9B;">Unsubscribe</a> from this newsletter<br/>52 Edison Court Suite 259 / East Aidabury / Cambodi<br/> <a href="#" style="color: #9B9B9B; text-decoration:none;">Made by svenhaustein.de</a></mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
```

## Furthermore
https://github.com/firebase/extensions/tree/master/firestore-send-email
https://mjml.io/try-it-live/templates/recast
https://mjml.io/try-it-live/templates/proof