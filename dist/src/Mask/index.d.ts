import React from 'react';
import './index.less';
interface IMask {
    className: string;
    anchorEl: Element;
    realWindow: Window;
}
declare const Mask: React.FC<IMask>;
export default Mask;
