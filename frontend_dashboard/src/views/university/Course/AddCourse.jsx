import React from 'react';
import {
  Row, Col, Label, Input,
} from 'reactstrap';
import api from "../../../services/api"; // <--- pastikan path sesuai
import 'react-datepicker/dist/react-datepicker.css';

class AddCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        id_instruktur: '',
        title: '',
        slug: '',
        thumbnail: '',
        description: '',
        duration: '',
        student_count: 0,
        video_length: '',
        skill_level: 'Beginner',
        price: '',
        rating: 0
      },
      isLoading: false,
      successMessage: '',
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value, type } = e.target;

    // Jangan ubah state langsung untuk file input
    if (type === 'file') return;

    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  }

  async handleSubmit(e) {
    e.preventDefault();

    try {
      this.setState({ isLoading: true, error: null, successMessage: '' });

      const { title, description, duration } = this.state.formData;
      if (!title || !description || !duration) {
        throw new Error('Title, description and duration are required');
      }

      const formData = new FormData();
      Object.keys(this.state.formData).forEach(key => {
        formData.append(key, this.state.formData[key]);
      });

      const thumbnailInput = document.querySelector('#thumbnail');
      if (thumbnailInput && thumbnailInput.files[0]) {
        formData.set('thumbnail', thumbnailInput.files[0]); // pakai set biar gak dobel
      }

      // 🚀 Axios request
      const res = await api.post('/api/course/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      this.setState({
        successMessage: 'Course created successfully!',
        isLoading: false,
        error: ''
      });

      window.location.href = "http://localhost:3000/admin/university/courses";
      console.log('Response:', res.data);

    } catch (error) {
      console.error('Submit error:', error);
      this.setState({
        error: error.response?.data?.message || error.message || 'Something went wrong',
        isLoading: false
      });
    }
  }

  render() {
    const { isLoading, error, successMessage } = this.state;

    return (
      <div>
        <div className="content">
          <Row>
            <Col xs={12} md={12}>

              <div className="page-title">
                <div className="float-left">
                  <h1 className="title">Add Course</h1>
                </div>
              </div>

              <div className="row margin-0">
                <div className="col-12">
                  <section className="box ">
                    <header className="panel_header">
                      <h2 className="title float-left">Basic Info</h2>
                    </header>
                    <div className="content-body">
                      <div className="row">
                        <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-8">

                          <form onSubmit={this.handleSubmit}>
                            <div className="form-row">
                              <div className="form-group col-md-12">
                                <label htmlFor="id_instruktur">Instructor ID</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="id_instruktur"
                                  name="id_instruktur"
                                  value={this.state.formData.id_instruktur}
                                  onChange={this.handleChange}
                                />
                              </div>

                              <div className="form-group col-md-12">
                                <label htmlFor="title">Course Title</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="title"
                                  name="title"
                                  value={this.state.formData.title}
                                  onChange={this.handleChange}
                                />
                              </div>

                              <div className="form-group col-md-12">
                                <label htmlFor="slug">Slug</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="slug"
                                  name="slug"
                                  value={this.state.formData.slug}
                                  onChange={this.handleChange}
                                />
                              </div>

                              <div className="form-group col-md-12">
                                <Label htmlFor="thumbnail">Course Thumbnail</Label>
                                <Input
                                  type="file"
                                  name="thumbnail"
                                  id="thumbnail"
                                  onChange={this.handleChange}
                                />
                              </div>

                              <div className="form-group col-md-12">
                                <Label htmlFor="description">Description</Label>
                                <Input
                                  type="textarea"
                                  name="description"
                                  id="description"
                                  value={this.state.formData.description}
                                  onChange={this.handleChange}
                                />
                              </div>

                              <div className="form-group col-md-12">
                                <label htmlFor="duration">Duration</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="duration"
                                  name="duration"
                                  value={this.state.formData.duration}
                                  onChange={this.handleChange}
                                />
                              </div>

                              <div className="form-group col-md-12">
                                <label htmlFor="video_length">Video Length</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="video_length"
                                  name="video_length"
                                  value={this.state.formData.video_length}
                                  onChange={this.handleChange}
                                />
                              </div>

                              <div className="form-group col-md-12">
                                <Label htmlFor="skill_level">Skill Level</Label>
                                <Input
                                  type="select"
                                  name="skill_level"
                                  id="skill_level"
                                  value={this.state.formData.skill_level}
                                  onChange={this.handleChange}
                                >
                                  <option value="Beginner">Beginner</option>
                                  <option value="Intermediate">Intermediate</option>
                                  <option value="Advanced">Advanced</option>
                                </Input>
                              </div>

                              <div className="form-group col-md-12">
                                <label htmlFor="price">Price</label>
                                <input
                                  type="number"
                                  step="0.01"
                                  className="form-control"
                                  id="price"
                                  name="price"
                                  value={this.state.formData.price}
                                  onChange={this.handleChange}
                                />
                              </div>

                              <div className="form-group col-md-12">
                                <label htmlFor="rating">Rating</label>
                                <input
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  max="5"
                                  className="form-control"
                                  id="rating"
                                  name="rating"
                                  value={this.state.formData.rating}
                                  onChange={this.handleChange}
                                />
                              </div>
                            </div>

                            {error && <p className="text-danger mt-2">{error}</p>}
                            {successMessage && <p className="text-success mt-2">{successMessage}</p>}

                            <button
                              type="submit"
                              className="btn btn-primary"
                              disabled={isLoading}
                            >
                              {isLoading ? 'Saving...' : 'Save'}
                            </button>
                          </form>

                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>

            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default AddCourse;
