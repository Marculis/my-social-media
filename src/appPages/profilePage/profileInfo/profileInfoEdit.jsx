import { Form } from "react-final-form";
import {
  InputComponent,
  TextareaComponent,
} from "../../components/formComponent/formComponent";
import css from "./profileInfo.module.css";

const ProfileInfoEdit = (props) => {
  const contacts = props.profile.contacts;
  const state = {
    data: props.profile,
  };
  const onSubmit = async (values) => {
    const ans = await props.editProfile(values);
    if (ans) {
      console.log(ans);
      return ans;
    }
    props.toggleEditMode();
  };
  return (
    <div>
      <Form
        onSubmit={onSubmit}
        initialValues={state.data}
        render={({ submitError, handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            {InputComponent("fullName", "Profile name", true, null)}
            {InputComponent("aboutMe", "About me", true, null)}
            {TextareaComponent(
              "lookingForAJobDescription",
              "My skills",
              true,
              null
            )}
            {InputComponent("lookingForAJob", "Need a job?", false, "checkbox")}
            <h5>Contacts:</h5>
            {Object.keys(contacts).map((item) => {
              return (
                <div key={item}>
                  {InputComponent("contacts." + item, item, false, null)}
                </div>
              );
            })}{" "}
            {submitError && <div className="error">{submitError}</div>}
            <div className={css.savebtn}>
              <button type="submit" disabled={submitting}>
                Save changes{" "}
              </button>
              <button type="button" onClick={() => props.toggleEditMode()}>
                Cancel
              </button>
            </div>
          </form>
        )}
      />
    </div>
  );
};
export default ProfileInfoEdit;
