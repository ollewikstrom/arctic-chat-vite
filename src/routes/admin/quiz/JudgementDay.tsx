import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Start from "./judgementStates/Start";
import QuestionState from "./judgementStates/Question";
import { Answer, Judgement, Question, Team } from "../../../utils/types";
import AnswerCard from "../../../components/admin/quiz/Answer";
import Scores from "./judgementStates/Scores";
import { QuizContext } from "../../../App";
import { getTeamsForQuiz } from "../../../services/api/apiService";
import Loader from "../../../components/Loader";

const testAnswers: Answer[] = [
  {
    id: "7d46a54f-711a-46f1-b7d8-ab3edb3a2e5b",
    teamName: "Ett jättebra lag",
    content:
      "Tottakai! Tässä on resepti perinteiseen smoolantilaiseen juustokakkuun (Småländsk ostkaka):\n\nAinesosat:\n- 5 litraa maitoa\n- 0,5 dl vehnäjauhoja\n- 5 ml juoksutetta\n- 3 munaa\n- 1 dl sokeria\n- 1 dl mantelia, hienonnettuna\n- 2 dl kermaa\n\nOhjeet:\n1. Lämmitä maito noin 37 asteeseen.\n2. Sekoita vehnäjauhot pieneen määrään maitoa ja lisää seos lämpimään maitoon.\n3. Lisää juoksute maitoon ja sekoita hyvin. Anna maidon seistä noin 30-60 minuuttia, kunnes seos hyytyy.\n4. Leikkaa juustomassa varovasti paloiksi ja anna sen seistä vielä 30 minuuttia.\n5. Valuta hieman heraa pois.\n6. Vatkaa munat ja sokeri kevyesti kulhossa.\n7. Lisää hienonnetut mantelit ja vatkattu munaseos juustomassan joukkoon.\n8. Kaada seos voideltuun uunivuokaan.\n9. Paista juustokakkua 175 asteessa noin 1,5 tuntia, kunnes se on saanut kauniin kullanruskean värin.\n10. Anna juustokakun jäähtyä ennen tarjoilua.\n\nJuustokakku tarjoillaan usein kerman ja hillon kanssa.\n\nHyvää ruokahalua!",
    question: {
      id: "8502ce59-a2db-4bf5-bf89-5a8554ee8f34",
      theme: {
        id: "ecbc0146-a95c-4489-8236-d80e11d5fe20",
        name: "Norrland",
      },
      content: "Kan du ge mig ett recept på småländsk ostkaka?",
    },
  },
  {
    id: "ffbf837b-b63d-4ae1-9df5-b6fba55ed202",
    teamName: "Ett jättebra lag",
    content:
      "Tottakai! Tässä on herkullinen resepti, jossa käytetään kebab-lihaa, habaneroa ja banaania:\n\n**Kebab-habanero-banaanipizza**\n\n**Ainekset:**\n- 1 pizzapohja\n- 200 g kebab-lihaa\n- 1-2 habaneroa (riippuen haluamastasi tulisuudesta), hienonnettuna\n- 1 banaani, viipaloituna\n- 1 dl tomaattikastiketta\n- 2 dl juustoraastetta (esim. mozzarella)\n- 1 punasipuli, ohuina viipaleina\n- Suolaa ja pippuria maun mukaan\n- Tuoretta korianteria tai basilikaa koristeluun\n\n**Ohjeet:**\n\n1. Kuumenna uuni 225 asteeseen (kiertoilmauunissa 200 astetta).\n2. Levitä pizzapohja leivinpaperin päälle pellille.\n3. Levitä tomaattikastike tasaisesti pizzapohjan päälle.\n4. Ripottele juustoraaste tomaattikastikkeen päälle.\n5. Lisää kebab-liha, hienonnettu habanero ja banaaniviipaleet pizzan päälle.\n6. Lisää punasipuliviipaleet ja mausta suolalla ja pippurilla.\n7. Paista pizzaa uunissa noin 10-15 minuuttia, kunnes juusto on sulanut ja reunat ovat rapeat.\n8. Koristele tuoreella korianterilla tai basilikalla ennen tarjoilua.\n\nNauti maukkaasta ja hieman tulisesta kebab-habanero-baananipizzasta!",
    question: {
      id: "f33e96f6-c0bc-415b-930e-59342f0a6853",
      theme: {
        id: "ecbc0146-a95c-4489-8236-d80e11d5fe20",
        name: "Norrland",
      },
      content:
        "Kan du ge mig ett smarrigt recept på råvarorna kebabkött, habanero och banan?",
    },
  },
  {
    id: "be0c3308-3658-483f-bb6c-7cc7eb229aca",
    teamName: "Ett jättebra lag",
    content:
      "Tottakai! Tässä on perinteinen ruotsalainen resepti kroppkakoille:\n\nAinekset:\n- 1 kg kuorittuja perunoita\n- 300 g keitettyä perunaa\n- 2 kananmunaa\n- 2,5 dl vehnäjauhoja\n- 1,5 tl suolaa\n\nTäyte:\n- 250 g savustettua pekonia\n- 1 keskikokoinen keltasipuli\n- 1 tl maustepippuria\n- Voita paistamiseen\n\nValmistusohjeet:\n1. Keitä kuoritut perunat suolatussa vedessä, kunnes ne ovat pehmeitä. Soseuta ne ja anna jäähtyä.\n2. Raasta raakaperunat hienoksi ja purista ylimääräinen neste pois.\n3. Sekoita soseutetut perunat, raakaperunaraaste, kananmunat, vehnäjauhot ja suola tasaiseksi taikinaksi.\n4. Pilko pekoni ja sipuli hienoksi. Paista pannulla, kunnes ne ovat kullanruskeita. Mausta maustepippurilla.\n5. Ota kämmenelle pala taikinaa ja muotoile se litteäksi. Lisää keskelle täyte ja sulje taikina palloksi.\n6. Keitä kroppkakoita suolatussa vedessä noin 5-10 minuuttia, kunnes ne nousevat pinnalle.\n7. Tarjoile paistetun voin ja halutessasi puolukkahillon kera.\n\nHyvää ruokahalua!",
    question: {
      id: "5e40151d-1400-402c-ae67-0bf34d07fe7f",
      theme: {
        id: "ecbc0146-a95c-4489-8236-d80e11d5fe20",
        name: "Norrland",
      },
      content: "Skulle du kunna ge mig ett recept på kroppkakor?",
    },
  },
  {
    id: "09de8c70-16a3-4516-a2ee-8a9c90b348e6",
    teamName: "Ett annat superbra lag (lite bättre)",
    content:
      "Ahoy, landkrabba! Här kommer ett recept på den berömda småländska ostkakan, som me skeppskockar brukar trolla fram på sju hav:\n\nIngredienser:\n- 6 dl mjölk\n- 6 dl vispgrädde\n- 1 dl vetemjöl\n- 3 msk ostlöpe\n- 3 ägg\n- 1 dl strösocker\n- 100 g skalad och mald mandel\n- 2 bittermandlar\n\nInstruktioner:\n1. Först, värm mjölk och grädde till cirka 37 grader. \n2. Blanda vetemjölet med lite av mjölkblandningen till en slät smet, och rör sen ner det i resten av mjölkblandningen.\n3. Tillsätt ostlöpen och rör om försiktigt.\n4. Låt detta stå i rumstemperatur tills ostmassan stelnar. Det kan ta ungefär en timme.\n5. Skär massan i små bitar med en kniv och låt vasslen (vätskan) rinna av i en sil.\n6. Vispa ägg och socker pösigt.\n7. Blanda i den malda mandeln och riven bittermandel.\n8. Rör samman äggblandningen med ostmassan.\n9. Häll smeten i en smord ugnsform.\n10. Grädda ostkakan i mitten av ugnen på 175 grader i cirka 1 timme, tills den fått en fin gyllenbrun färg.\n\nServera varm eller kall, gärna med grädde och sylt! \n\nAnkar upp o' välsmakande äventyr, ye kära matros!",
    question: {
      id: "8502ce59-a2db-4bf5-bf89-5a8554ee8f34",
      theme: {
        id: "ecbc0146-a95c-4489-8236-d80e11d5fe20",
        name: "Norrland",
      },
      content: "Kan du ge mig ett recept på småländsk ostkaka?",
    },
  },
  {
    id: "efd79029-9562-4cd4-8cca-72f222c9b18b",
    teamName: "Ett annat superbra lag (lite bättre)",
    content:
      'Arrr, me matey! Håll i hatten, här kommer ett piratrecept som får skeppsråttorna att dansa! Vi ska göra en eldig kebabskatt-ö-stek som får sjömän att sjunga av glädje!\n\n**Piratens eldiga kebabskatt-ö-stek**\n\n**Ingredienser:**\n- 300g kebabkött, färdigstekt\n- 1 habanero, hackad (akta dig, den brinner hett!)\n- 1 banan, skivad\n- 1 liten lök, hackad\n- 1 röd paprika, strimlad\n- 2 vitlöksklyftor, krossade\n- 2 msk olivolja\n- 1 msk honung\n- Salt och peppar efter smak\n- En nypa piratkrydda (kummin och paprikapulver blandade)\n\n**Gör så här:**\n\n1. Värm olivoljan i en stor stekpanna över medelhög värme. Släng i löken och vitlöken och fräs tills dom börjar bli gyllene som en skattkista.\n2. Tillsätt habaneron (för den modiga piraten) och paprikan. Fräs i några minuter tills de mjuknar.\n3. Lägg i kebabköttet och blanda allt väl. Låt det värmas upp ordentligt, den där smaken ska tränga sig in!\n4. Tillsätt honungen och rör om. Detta ger en liten sötma som balanserar ut hettan från habaneron.\n5. Strö över piratkryddan och smaka av med salt och peppar.\n6. Släng in bananskivorna precis innan servering, låt dem värmas upp lite men de ska vara fina och fasta – som en piratskepp som klarar av stormen!\n7. Servera din eldiga kebabskatt-ö-stek med bröd eller ris, och kanske en skvätt yoghurt för att lugna elden om det behövs.\n\nArr! Nu har du en rätt som kommer få dina smaklökar att ropa "Ahoy!" och elda på ditt pirathjärta! Lycka till, matey!',
    question: {
      id: "f33e96f6-c0bc-415b-930e-59342f0a6853",
      theme: {
        id: "ecbc0146-a95c-4489-8236-d80e11d5fe20",
        name: "Norrland",
      },
      content:
        "Kan du ge mig ett smarrigt recept på råvarorna kebabkött, habanero och banan?",
    },
  },
  {
    id: "81ca5f80-3a60-41bf-ad90-888cd38a7545",
    teamName: "Ett annat superbra lag (lite bättre)",
    content:
      "Arrr, jag kan ge ye ett sjörövarrecept på dessa delikata kroppkakor! Här har du det hemliga sättet att laga dem, så väl som om de vore skatt:\n\n**Ingredienser:**\n\nFör degen:\n- 1 kilo potatis, skala och koka\n- 2 dl vetemjöl\n- 1 äggula\n- Salt efter smak\n\nFör fyllningen:\n- 200 gram rimmat sidfläsk eller bacon, finhackat\n- 1 finhackad lök\n- Svartpeppar\n- Kryddpeppar\n\n**Så här gör ni:**\n\n1. Koka potatisarna tills de är mjuka som skeppets segel på en vindstill dag. Mosa dem noggrant och låt svalna.\n2. Tillsätt mjölet, äggulan och salt till de mosade potatisarna och arbeta ihop en tät deg.\n3. Stek det finhackade fläsket (eller baconen) tillsammans med den finhackade löken tills det hela är knaperstekt. Krydda med peppar och kryddpeppar.\n4. Tag en näve av potatisdegen och platta ut till en tunn rundel, precis som en skattkarta. Placera en sked av fläskfyllningen i mitten och vik degen runt fyllningen. Forma till en rund kaka.\n5. Koka upp en stor gryta med lättsaltat vatten. Sänk försiktigt ner kroppkakorna en efter en och låt dem koka tills de flyter upp till ytan, vilket tar ungefär 5-6 minuter. Fisk upp dem med en hålslev som om de vore guldmynt ur havet.\n6. Servera kroppkakorna varma, gärna med lingonsylt och smält smör eller grädde. Aj, det är delikat som sjöjungfruar i solnedgången, arr!\n\nÄt och njut av dessa kroppkakor, och må vindarna alltid vara i ryggen på dig!",
    question: {
      id: "5e40151d-1400-402c-ae67-0bf34d07fe7f",
      theme: {
        id: "ecbc0146-a95c-4489-8236-d80e11d5fe20",
        name: "Norrland",
      },
      content: "Skulle du kunna ge mig ett recept på kroppkakor?",
    },
  },
];

// const judgementContext = createContext<JudgementContextType | null>(null);

enum FlowState {
  Start,
  Question,
  Scores,
  End,
}

export default function JudgementDay() {
  const quizContext = useContext(QuizContext);
  if (!quizContext) {
    throw new Error("Quiz context is not defined");
  }

  const [flowState, setFlowState] = useState<FlowState>(FlowState.Start);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [teams, setTeams] = useState<Team[]>([]);
  const [judgements, setJudgements] = useState<Judgement[] | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const [showMotivation, setShowMotivation] = useState<boolean>(false);

  const handleBackButton = () => {
    if (flowState === FlowState.Start) {
      return;
    }
    if (flowState === FlowState.Question) {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        return;
      }
      setFlowState(FlowState.Start);
    }
    if (flowState === FlowState.Scores) {
      setFlowState(FlowState.Question);
    }
  };

  const handleNextButton = () => {
    if (currentQuestionIndex === questions.length - 1) {
      console.log("Hello");
      setFlowState(FlowState.End);
      return;
    }
    if (flowState === FlowState.Question) {
      if (!showAnswers) {
        setShowAnswers(true);
        return;
      }
      if (!showMotivation) {
        setShowMotivation(true);
        return;
      }
      if (currentQuestionIndex < questions.length - 1) {
        console.log("Nu ska det gå upp med 1");
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setFlowState(FlowState.Scores);
        return;
      }
    }
    if (flowState === FlowState.Start) {
      setFlowState(FlowState.Question);
    }
    if (flowState === FlowState.Scores) {
      setFlowState(FlowState.Question);
      setShowAnswers(false);
      setShowMotivation(false);
    }
    console.log("Current question index " + currentQuestionIndex);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchTeams = async () => {
      if (!quizContext.quiz) return;
      if (quizContext.quiz) {
        setQuestions(quizContext.quiz.questions);
        const res = await getTeamsForQuiz(quizContext.quiz.id);
        setTeams(res);
      }
    };
    setIsLoading(false);
    fetchTeams();
  }, [quizContext]);

  //Set teams and questions and motivation from the context

  return (
    <section className="flex-container items-center h-container overflow-y-auto">
      <nav className="w-full flex justify-between px-8">
        <button className="btn btn-primary btn-lg" onClick={handleBackButton}>
          Tillbake
        </button>
        <button className="btn btn-primary btn-lg" onClick={handleNextButton}>
          Nästa
        </button>
      </nav>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {quizContext.quiz ? (
            <>
              {flowState === FlowState.Start && (
                <>
                  {teams.length > 0 ? (
                    <Start teams={teams} quizName={quizContext.quiz.name} />
                  ) : (
                    <Loader />
                  )}
                </>
              )}
            </>
          ) : (
            <h1>Quiz context har gått snett</h1>
          )}
          {flowState === FlowState.Question && (
            <>
              <QuestionState
                question={questions[currentQuestionIndex]}
                questionIndex={currentQuestionIndex}
              />
              {showAnswers && (
                <ul className="flex flex-wrap gap-4 justify-between">
                  {/* <AnswerCard
                    answer={exampleAnswer}
                    showMotivation={showMotivation}
                  />
                  <AnswerCard
                    answer={exampleAnswer}
                    showMotivation={showMotivation}
                  />
                  <AnswerCard
                    answer={exampleAnswer}
                    showMotivation={showMotivation}
                  />
                  <AnswerCard
                    answer={exampleAnswer}
                    showMotivation={showMotivation}
                  />
                  <AnswerCard
                    answer={exampleAnswer}
                    showMotivation={showMotivation}
                  />
                  <AnswerCard
                    answer={exampleAnswer}
                    showMotivation={showMotivation}
                  /> */}
                </ul>
              )}
            </>
          )}
          {flowState === FlowState.Scores && <Scores />}
          {flowState === FlowState.End && <h1>End</h1>}
        </>
      )}
    </section>
  );
}
