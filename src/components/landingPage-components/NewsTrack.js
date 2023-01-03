import React from "react";
import { Link } from "react-router-dom";
export default function NewsTrack(props) {
  return (
    <div className="marquee">
      <div className="marquee__item">
        <>
          <span> مرحبا بك في أخضر مكة</span>
          <span className="marquee__seperator"></span>
        </>
        <>
          <span>
            <Link to="/news/1">
              الفيصل يستعرض مبادرة "أخضر مكة" وآليات التوسع في المسطحات الخضراء
              بالمنطقة
            </Link>
          </span>
          <span className="marquee__seperator"></span>
        </>
        <>
          <span style={{ textAlign: "right" }}>
            مبادرة أخضر مكه نقله نوعية نحو تحقيق برنامج المملكة الخضراء
          </span>
          <span className="marquee__seperator"></span>
        </>
        <>
          <span>
            تُشارك #هيئة_تطوير_منطقة_مكة بجناح تعريفي لمبادرة #أخضر_مكة{" "}
          </span>
          <span className="marquee__seperator"></span>
        </>
        <>
          <span>
            {" "}
            الرئيس التنفيذي لـ #هيئة_تطوير_منطقة_مكة م.أحمد العارضي متحدثًا عن
            مبادرة #أخضر_مكة
          </span>
          <span className="marquee__seperator"></span>
        </>

        <>
          <span>
            يمكنك الأن اكتشاف معالم مكه المكة المكرمه عن طريق المستكشف
          </span>
          <span className="marquee__seperator"></span>
        </>
      </div>
    </div>
  );
}
