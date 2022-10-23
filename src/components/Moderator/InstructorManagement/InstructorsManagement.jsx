import React, { Component } from 'react'
import { InstructorSingleRegistration } from '../../ApiConfig/Api';
import Swal from "sweetalert2";
import { AiOutlineMail, AiFillIdcard, AiOutlineMobile } from 'react-icons/ai';
import { CgLastpass, CgRename } from 'react-icons/cg';
import { MdOutlineIntegrationInstructions } from 'react-icons/md';
import InstructorsTable from './InstructorsTable'
import UploadFileForm from '../UploadFileForm';
export default class InstructorsManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      FullName: "",
      Email: "",
      password: "",
      InstructorId: "",
      Phone: "",
      InstructorReference: "",
      Subject: "",
      HasPermissionTo: "",
      editClicked: false
    }
    this.handelSubmit = this.handelSubmit.bind(this);
    this.toggleHandler = this.toggleHandler.bind(this);
  }
  RegisterSingleInstructor = (data) => {
    InstructorSingleRegistration(data)
      .then(response => {
        console.log(response);
        let errMessage = response.data.message
        console.log(errMessage);
        if (response.data.success === false && errMessage === "Email") {
          Swal.fire({ icon: 'error', title: "البريد الالكتروني مسجل من قبل " });
        }
        else if (response.data.success === true) {
          Swal.fire({ icon: 'success', title: "تم تسجيل المتدرب بنجاح  " });
        }
        else {
          Swal.fire({ icon: 'error', title: "الرجاء التأكد  من ادخال البيانات بشكل صحيح" });
        }
      })
      .catch(error => {
        Swal.fire({ icon: 'error', title: `حدث خطا` });
      });
  };


  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handelSubmit = e => {
    const newInstructor = this.state;
    e.preventDefault();
    this.RegisterSingleInstructor(newInstructor);
  };
  onChange = (FullName, Email, InstructorId, Phone, InstructorReference, Subject) => {
    this.setState({ FullName, Email, InstructorId, Phone, InstructorReference, Subject })
  }

  toggleHandler = (e) => {
    this.setState({ show: !this.state.show })
  }
  handelEditToggle = () => {
    const {editClicked} = this.state
    if(editClicked) this.setState({FullName:"",InstructorId:"", Email:"", Phone:"", password:"", InstructorReference:"", Subject:""})
    this.setState({editClicked: !editClicked});
  }
  render() {
    const { FullName, InstructorId, Email, Phone, password, show, InstructorReference, Subject, editClicked } = this.state;
    const From = <div className="LoginContainer avoid--element-conflict">
      <form className='login-form' >
        <div className="flex-row">
          <label className="lf--label" htmlFor="Email">
            <AiOutlineMail />
          </label>
          <input id="Email"
            required
            className='lf--input'
            placeholder='البريد الالكتروني'
            name="Email"
            type="text"
            onChange={e => this.handleChange(e)}
            value={Email} />
        </div>
        <div className="flex-row">
          <label className="lf--label" htmlFor="password">
            <CgLastpass />
          </label>
          <input
            required
            id="password"
            className='lf--input'
            placeholder='كلمة المرور'
            name="password"
            type='password'
            onChange={e => this.handleChange(e)}
            value={password} />
        </div>
        <div className="flex-row">
          <label className="lf--label" htmlFor="NationalId">
            <CgRename />
          </label>
          <input
            required
            id="FullName"
            className='lf--input'
            placeholder='اسم المدرب'
            name="FullName"
            type="text"
            onChange={e => this.handleChange(e)}
            value={FullName} />
        </div>
        <div className="flex-row">
          <label className="lf--label" htmlFor="InstructorId">
            <AiFillIdcard />
          </label>
          <input
            required
            id="InstructorId"
            className='lf--input'
            placeholder='رقم المدرب'
            name="InstructorId"
            type="number"
            onChange={e => this.handleChange(e)}
            value={InstructorId} />
        </div>
        <div className="flex-row">
          <label className="lf--label" htmlFor="InstructorId">
            <AiFillIdcard />
          </label>
          <input
            required
            id="InstructorReference"
            className='lf--input'
            placeholder='الرقم المرجعي'
            name="InstructorReference"
            type="number"
            onChange={e => this.handleChange(e)}
            value={InstructorReference} />
        </div>
        <div className="flex-row">
          <label className="lf--label" htmlFor="NationalId">
            <MdOutlineIntegrationInstructions />
          </label>
          <input
            required
            id="Subject"
            className='lf--input'
            placeholder='اسم المادة'
            name="Subject"
            type="text"
            onChange={e => this.handleChange(e)}
            value={Subject} />
        </div>
        <div className="flex-row">
          <label className="lf--label" htmlFor="Phone">
            <AiOutlineMobile />
          </label>
          <input
            required
            id="Phone"
            className='lf--input'
            placeholder='رقم الجوال '
            name="Phone"
            type="number"
            onChange={e => this.handleChange(e)}
            value={Phone} />
        </div>
        <input className='lf--submit' type='submit' onClick={e => this.handelSubmit(e)} value='تسجيل المدرب' />
        {(editClicked) ? <input className='lf--submit' onClick={() => this.handelEditToggle()} value='رجوع' /> :
          <input className='lf--submit' onClick={e => this.toggleHandler(e)} value='رفع الملف وتسجيل المدربين' />}
      </form>
    </div>
    return (
      <>
        {
          (!editClicked) ?
            <>
              {From}
              <InstructorsTable handelEditToggle={this.handelEditToggle} onNameChange={this.onChange} />
            </>
            : <>{From}</>}
        {(!show) ? "" : <UploadFileForm toggleHandler={this.toggleHandler} from={"instructor"} />}
      </>
    )
  }
}