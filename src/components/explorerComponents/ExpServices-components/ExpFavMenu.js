import React, { useState } from "react";
//import Packages
import { Form, Input } from "antd";
import Fade from "react-reveal/Fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function ExpFavMenu(props) {
  const [favName, setFavName] = useState("");
  // const confirmationAddFav = () => {
  //   const args = {
  //     description: "تم الإضافة للمفضلة بنجاح",
  //     duration: 3,
  //   };
  //   notification.open(args);
  // };
  // const confirmationErrorInAddFav = () => {
  //   const args = {
  //     description: "حدث خطأ. برجاء المحاولة مرة أخرى",
  //     duration: 3,
  //   };
  //   notification.open(args);
  // };
  const addToFav = async (e) => {};

  const handleFavName = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setFavName(e.target.value);
  };

  return (
    <Fade left collapse>
      <div className="ServiceMenu ">
        <span>
          <FontAwesomeIcon
            icon={faTimes}
            style={{ marginTop: "5px", marginRight: "5px", cursor: "pointer" }}
            className="closeServMenu"
            onClick={props.closeServiceMenu}
          />
        </span>
        <Form
          onClick={(e) => e.stopPropagation()}
          layout="vertical"
          name="validate_other"
          onFinish={() => addToFav()}
        >
          <Form.Item
            className="mt-1 mb-1"
            rules={[
              {
                message: "من فضلك ادخل الاسم أولا",
                required: true,
              },
            ]}
            name="favName"
            hasFeedback
          >
            <Input
              name="favName"
              value={favName}
              onChange={handleFavName}
              placeholder="الإسم "
            />
          </Form.Item>
          <button
            onClick={addToFav}
            className="SearchBtn mb-1 w-100"
            size="large"
            htmlType="submit"
          >
            أضف للمفضلة
          </button>
        </Form>
      </div>
    </Fade>
  );
}

export default ExpFavMenu;
