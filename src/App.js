import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, lazyload, responsive, placeholder } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { Effect } from "@cloudinary/url-gen/actions/effect";
import byRadius from "@cloudinary/url-gen/actions/roundCorners/byRadius";
import byAngle from "@cloudinary/url-gen/actions/rotate/byAngle";
import "./App.css";

const cld = new Cloudinary({
    cloud: {
        cloudName: "dqydioa16",
    },
});

const App = () => {
    const file =
        "https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

    let image = cld.image(file);

    image = image.setDeliveryType("fetch");
    console.log(decodeURI(image.toURL()));
    image = image.effect(Effect.sepia()).quality("q_auto");

    // because of the reponsive plugin that is used below I removed this "resize(fill().height(500).width(490))" because this rezizes the image but in a hard coded manner and doesn't handle responsiveness

    // image = image
    //     .effect(Effect.sepia())
    //     .resize(fill().height(500).width(490))
    //     .roundCorners(byRadius().radius(40))
    //     .rotate(byAngle(20));

    // this gives the full delivery URL of the tranformations applied above
    console.log({ url: image.toURL() });
    // ! 'https://res.cloudinary.com/dqydioa16/image/fetch/e_sepia/c_fill,h_500,w_490/r_40/a_20/https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg%3Fauto%3Dcompress&cs%3Dtinysrgb&dpr%3D2&h%3D650&w%3D940?_a=ATAABAA0'
    // this gives the onlu the tranformation part contained in the full delivery URL
    console.log({ url: image.toString() });
    //'e_sepia/c_fill,h_500,w_490/r_40/a_20'
    return (
        <div style={{ paddingBottom: "30rem" }}>
            <h1>scroll to lazy load </h1>
            <p style={{ marginBottom: "50rem" }} />
            <AdvancedImage
                cldImg={image}
                plugins={[lazyload("0", 1), responsive(200), placeholder("blur")]}
            />
        </div>
    );
};

export default App;
