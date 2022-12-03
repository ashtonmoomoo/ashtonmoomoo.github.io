import { Post } from "../types";

const title = "Lorem Ipsum" as string;

const summary = `
Lorem markdownum mihi, dispersa sollertia fuit mei eburnea fratri in aevi quam
condidit humano, Hiberis pectus filum.
` as string;

const md = `
# Eandem tacta genitorque Tarpeia torum nec captaeque

## Bicorni maribus

Lorem markdownum mihi, dispersa sollertia fuit mei eburnea fratri in aevi quam
condidit humano, Hiberis pectus filum. Dedimus nata honorem: tempus stamen regia
vulnera; vir exigua est *campo* loqui vocatum, fugientem fessos ullus? *Sonantem
si* Tartara ceperat caelo exteriusque tarda orbem; in et dum limitibus, quid
ferocis!

1. Sine haud suis viderat
2. Ponit abdidit et decoris aurea
3. Quaerant pharetram habet dederis tamen ora confusa
4. Merito feres pariter

Suo remotos pariter se olim crura adsumere monstra **conplectitur** annis est
domus duabus [aere avellit](http://senili-paterque.io/) terras, mersaeque
gramina. Regna firmat ille et Ascanii viribus ne ille dea dederit utilitas per
sontem ipsa.

## Stygios pulmonis

Luminis sua haec, simillimus nata vipereas
[iussa](http://www.viasaspice.org/inde) Marathon sequentes. Nympharum quam.
\`\`\`js
for (const i = 0; i < 100; i++) {
  console.log(i);
}
\`\`\`

Mea caelo, flagratque miles, pariter, crepuscula quoque Phrygiaeque signat
adporrectumque Tartara indignante illa quantum. Infecerat subdidit voracior
animans, cum pontus iussis vellet viscere ruit legar Minervae vestis hac. Aliter
horrida nemus lascivitque latronis, quantum **est ense latitantia** si lunaria,
simul verba, quod solitos. Procubuit *ad fine* relicta adsum stipite et
deprensi: qui restabat bene manu et lacrimarum dicere nec ardore ne *adsueto*.
Aera aliquisque huius capitum, inobservata temperiemque eodem de Pallantias in
nudum advertite umeri cornuaque terruit en Martis.

Persei Cyllenius vitae, tamen praetenta, valuit deum, aequora. Ligat
*inmunemque* tenues; ex nec, nube est spargere domum. Summa fas plenaque vires
superis [euntem](http://www.ubi.net/parere) piget diuque.
` as string;

export const loremIpsum: Post = {
  id: "lorem-ipsum",
  title,
  summary,
  mdContent: md,
  posted: new Date("2021-12-03"),
};
