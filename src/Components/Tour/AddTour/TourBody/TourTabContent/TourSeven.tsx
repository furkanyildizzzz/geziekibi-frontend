import { Col } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
import { TourTypeDisplayNames, TourTypeEnum } from "@/app/lib/enums";
import { useCallback } from "react";
import RichTextEditor2 from "@/Components/Editor/RichTextEditor2";

export const DropDownData = [
  {
    id: TourTypeEnum.YURTICI,
    name: TourTypeDisplayNames[TourTypeEnum.YURTICI],
    header: true,
  },
  {
    id: TourTypeEnum.YURTDISI,
    name: TourTypeDisplayNames[TourTypeEnum.YURTDISI],
  },
  {
    id: TourTypeEnum.GUNUBIRLIK,
    name: TourTypeDisplayNames[TourTypeEnum.GUNUBIRLIK],
  },
];

const importantNotes = `
*Rezervasyon esnasında kesinlikle koltuk numarası sözü ve garantisi verilemez.
<br />
*Rehber gerekli gördüğü takdirde, tüm programı gerçekleştirmek kaydı ile zamanlama ve program akışı konusunda değişiklik yapma hakkına sahiptir.
<br />
*Programda belirtilen oteller standartları ve mevkileri bakımından aynı olmak kaydı ile değiştirilebilir.
<br />
*Turumuzda rehberlik, ulaşım, konaklama ve çevre gezileri paket programdır ayrı düşünülemez.
<br />
*Çocuk indirimi iki yetişkin yanında uygulanır tek bir çocuk için kullanılır.
<br />
*En son sirkü bir öncekini geçersiz kılar.
<br />
*Program zamanlamasında hava, yol vb. nedenlerle rehber gerekli gördüğü taktirde değişiklik yapabilir. Turlarımızda kullanılan araç tipleri kişi sayılarına göre aşağıdaki şekilde sınıflandırılır.
<br />
*Her turumuzda bulunan kişi sayısına göre aşağıda bulunan araç tipleri tayin edilir.
<br />
*Otobüsler: 28-46 kişi sayılarında kullanılır.
<br />
*Mercedes Travego-Tourismo 46+1+1 koltuklandırma, abs, asr, klima, 2 adet monitör, 2 adet buzdolabı, su ısıtıcılı mutfak ünitesi, okuma lambaları, rehber anonsu için ses sistemi, cd ve dvd oynatıcı (cep telefonu kullanılabilir)
<br />
*Neoplan Cityliner-Tourliner 46+1+1 koltuklandırma, abs, asr, klima, 2 adet monitör, 2 adet buzdolabı, su ısıtıcılı mutfak ünitesi, okuma lambaları, rehber anonsu için ses sistemi, cd ve dvd oynatıcı (cep telefonu kullanılabilir)
<br />
*Mitsubishi Safir 54+1+1 koltuklandırma, abs, asr, klima, 2 adet monitör, 2 adet buzdolabı, su ısıtıcılı mutfak ünitesi, okuma lambaları, rehber anonsu için ses sistemi, cd ve dvd oynatıcı (cep telefonu kullanılabilir)
<br />
*Midibüsler: 17-27 kişi sayılarında kullanılır. Isuzu Turkuaz 31+1 koltuklandırma, yatar otobüs koltuklu, abs, asr, klima, 1 adet monitör, 1 adet buzdolabı, su ısıtıcılı mutfak ünitesi, okuma lambaları, rehber anonsu için ses sistemi, cd ve dvd oynatıcı.
<br />
*Minibüsler: 16’ya kadar kişi sayılarında kullanılır. Vw Volt 12+1 koltuklandırma, özel tasarlanmış yatar otobüs deri koltuklu, abs, asr, klima, 1 adet buzdolabı, okuma lambaları, rehber anonsu için ses sistemi, cd ve dvd oynatıcı. Vw Volt El 16+1 koltuklandırma, özel tasarlanmış yatar otobüs deri koltuklu, abs, asr, klima, 1 adet buzdolabı, okuma lambaları, rehber anonsu için ses sistemi, cd ve dvd oynatıcı.
<br />
*Mercedes Sprinter 12+1 koltuklandırma, özel tasarlanmış yatar otobüs deri koltuklu, abs, asr, klima, 1 adet buzdolabı, okuma lambaları, rehber anonsu için ses sistemi, cd ve dvd oynatıcı.
<br />
*Mercedes Sprinter El 16+1 koltuklandırma, özel tasarlanmış yatar otobüs deri koltuklu, abs, asr, klima, 1 adet buzdolabı, okuma lambaları, rehber anonsu için ses sistemi, cd ve dvd oynatıcı.
`;

const TourSeven = () => {
  const { formValue } = useAppSelector((state) => state.addProduct);
  const dispatch = useAppDispatch();

  const handleChange = useCallback((value: string) => {
    dispatch(setFormValue({ name: "importantNotes", value: value }));
  }, []);
  return (
    <Col xs="12">
      <div id="editor2">
        {/* <RichTextEditor onChange={handleChange} /> */}
        <RichTextEditor2
          initialValue={formValue.importantNotes || importantNotes}
          uploadFolderPath="/tour/uploadBodyImage"
          onChange={handleChange}
        />
      </div>
    </Col>
  );
};
export default TourSeven;
