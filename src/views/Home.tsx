import { Link } from 'react-router-dom'
import '../css/Home.css'

const Home = (): JSX.Element => {
    return (
        <div id="home">
            <h1>
                Welcome
            </h1>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempus, ipsum ut tempor porttitor, sapien arcu ullamcorper velit, quis lobortis sem ligula ut enim. In hac habitasse platea dictumst. Vivamus placerat elit id vulputate bibendum. Nunc cursus dolor nec nibh scelerisque, non sodales lacus cursus. Suspendisse quis dapibus risus, et ultrices risus. Maecenas semper odio et vehicula sodales. Sed tellus felis, ornare nec diam in, convallis scelerisque neque. Pellentesque porttitor velit libero, eu mattis tellus euismod ut. Integer dapibus laoreet mauris, non luctus eros aliquam non.
            </p>

            <Link to="/products">
See our products
            </Link>
        </div>
    )
}
export default Home
