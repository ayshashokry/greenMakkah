
import { useEffect, useState } from "react";
import { Spin } from "antd";

export default function LoadingComponent() {

    const [printBoxStyle, setPrintBox] = useState(null);
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        document.addEventListener('showLoading', (event) => {
            setShowLoading(event.detail);
        });
        document.addEventListener('showPrintBox', (event) => {
            setPrintBox(event.detail);
        });
    });


    return (<div>
        {showLoading &&
            <div className="spinStyle">
                <Spin size="large" className="spinStyleConatiner" />
            </div>}
        {printBoxStyle && printBoxStyle.show &&
            <div class="print-box hidden-print" style={printBoxStyle.style} ></div>}
    </div>)

}