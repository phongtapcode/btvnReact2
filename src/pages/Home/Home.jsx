import { useEffect, useState } from "react";
import ItemData from "../../components/ItemData/ItemData";
import { Button, Modal, message } from "antd";
import axios from "axios";
import "./Home.scss";

function Home() {
  const [dataApi, setDataApi] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [statusButton, setStatusButton] = useState("Thêm");
  const [currentId, setCurrentId] = useState(1);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [valueInput, setValueInput] = useState({
    urlImg: "",
    email: "",
    city: "",
  });

  useEffect(() => {
    axios
      .get("https://60becf8e6035840017c17a48.mockapi.io/users")
      .then((respon) => respon.data)
      .then((datas) => {
        setDataApi(datas);
      });
  }, []);

  const handleClickPut = (index, data) => {
    setStatusButton("Sửa");
    setValueInput({ urlImg: data.image, email: data.email, city: data.city });
    setCurrentId(index);
  };

  const handleClickDelete = (index, data) => {
    setCurrentId(index);
    setStatusButton("Xóa");
    setValueInput({ urlImg: data.image, email: data.email, city: data.city });
  };

  const handleInputChange = (e) => {
    setValueInput({ ...valueInput, [e.target.name]: e.target.value });
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    if (statusButton === "Thêm") {
      axios
        .post("https://60becf8e6035840017c17a48.mockapi.io/users", valueInput)
        .then((response) => {
          setDataApi([...dataApi, response.data]);
        });
    } else if (statusButton === "Sửa") {
      axios
        .put(
          `https://60becf8e6035840017c17a48.mockapi.io/users/${currentId}`,
          valueInput
        )
        .then((response) => {
          const updatedDataApi = dataApi.map((item) => {
            if (item.id === currentId) {
              return response.data;
            }
            return item;
          });
          setDataApi(updatedDataApi);
        });
    } else {
      axios
        .delete(
          `https://60becf8e6035840017c17a48.mockapi.io/users/${currentId}`
        )
        .then(() => {
          const updatedDataApi = dataApi.filter(
            (item) => item.id !== currentId
          );
          setDataApi(updatedDataApi);
        });
    }

    setConfirmLoading(true);

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      setValueInput({
        urlImg: "",
        email: "",
        city: "",
      });
      setStatusButton("Thêm");
      messageApi.open({
        type: "success",
        content: `Bạn đã ${statusButton} thành công`,
      });
    }, 1000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      {contextHolder}
      <h1>
        {statusButton === "Thêm" || statusButton === "Xóa"
          ? `${statusButton} sản phẩm`
          : `Sửa id ${currentId}`}
      </h1>

      <form className="form">
        <div className="form__input form__img">
          <label>url Ảnh</label>
          <input
            type="text"
            name="urlImg"
            required
            placeholder="image"
            onChange={handleInputChange}
            value={valueInput.urlImg}
          />
        </div>

        <div className="form__input form__email">
          <label>Email</label>
          <input
            type="text"
            name="email"
            required
            placeholder="email"
            onChange={handleInputChange}
            value={valueInput.email}
          />
        </div>

        <div className="form__input form__city">
          <label>Thành phố</label>
          <input
            type="text"
            name="city"
            required
            placeholder="city"
            onChange={handleInputChange}
            value={valueInput.city}
          />
        </div>

        <>
          <Button type="primary" onClick={showModal}>
            {statusButton}
          </Button>
          <Modal
            title="Xác nhận lại"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <p>{`Bạn có chắc chắn muốn ${statusButton}`}</p>
          </Modal>
        </>
      </form>

      <div className="title">
        <div className="title__id">id</div>
        <div className="title__avatar">Ảnh</div>
        <div className="title__email">Email</div>
        <div className="title__city">Thành phố</div>
        <div className="title__icon">Sửa + Xóa</div>
      </div>

      {dataApi.map((item) => {
        return (
          <ItemData
            data={item}
            onClickPut={() => handleClickPut(item.id, item)}
            onClickDelete={() => handleClickDelete(item.id, item)}
          />
        );
      })}
    </>
  );
}
export default Home;
