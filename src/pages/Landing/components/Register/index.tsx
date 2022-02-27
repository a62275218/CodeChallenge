import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Input from "../../../../components/Input";
import ModalContext from "../../../../context/modal";
import Done from "../Done";
import axios from "axios";
import "./index.less";

export default function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [reEmail, setReEmail] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [reEmailError, setReEmailError] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string>("");
  const { showModal } = useContext(ModalContext);
  const unmountRef = useRef<boolean>(false);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      let hasError;
      if (!name.trim()) {
        setNameError("name is required");
        hasError = true;
      }
      if (!email.trim()) {
        setEmailError("email is required");
        hasError = true;
      }
      if (email !== reEmail) {
        setReEmailError("email not match");
        hasError = true;
      }
      if (hasError) {
        return;
      }
      setFetchError("");
      setIsFetching(true);
      axios("/api/prod/fake-auth", {
        method: "POST",
        data: {
          name,
          email,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            showModal(<Done />);
          } else {
            setFetchError(res.statusText);
          }
        })
        .catch((err) => {
          setFetchError(err.response.data?.errorMessage ?? "");
        })
        .finally(() => {
          if (!unmountRef.current) {
            setIsFetching(false);
          }
        });
    },
    [name, email, reEmail]
  );

  useEffect(() => {
    setReEmailError(
      email !== reEmail && (email.length > 0 || reEmail.length > 0)
        ? "email not match"
        : ""
    );
  }, [email, reEmail]);

  useEffect(() => {
    if (nameError && name) {
      setNameError("");
    }

    if (email) {
      setEmailError(
        new RegExp(
          /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
        ).test(email)
          ? ""
          : "invalid email"
      );
    }
  }, [name, email, nameError]);

  useEffect(() => {
    return () => {
      unmountRef.current = true;
    };
  }, []);

  return (
    <form className="registration-form" action="" onSubmit={handleSubmit}>
      <header className="form-header">Request an invite</header>
      <section className="form-body">
        <Input
          className={`${nameError && "highlight"} form-input`}
          value={name}
          onChange={setName}
          placeholder={"Full Name"}
        />
        {nameError && <span className="error-msg">{nameError}</span>}
        <Input
          type="email"
          className={`${emailError && "highlight"} form-input`}
          value={email}
          onChange={setEmail}
          placeholder={"Email"}
        />
        {emailError && <span className="error-msg">{emailError}</span>}
        <Input
          type="email"
          className={`${reEmailError && "highlight"} form-input`}
          value={reEmail}
          onChange={setReEmail}
          placeholder={"Confirm Email"}
        />
        {reEmailError && <span className="error-msg">{reEmailError}</span>}
        <button disabled={isFetching} className="submit-btn" type="submit">
          {isFetching ? "Sending, please wait" : "Send"}
        </button>
        {fetchError && <span className="error-msg center">{fetchError}</span>}
      </section>
    </form>
  );
}
