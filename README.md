    let token =localStorage.getItem("token")
       const fetchSingleBrand = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${baseUrl}/languages/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // console.log(res)
            setValues(res.data.data)
            // setImgFile(res.data.data.brand_image)
            setCurrentImage(res.data.data.brand_image)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log("single category error", error)
        }
    }

       useEffect(() => {
        fetchSingleBrand();
    }, [])

    satus in brand

const fetchCategory = async () => {
try {
const res = await axios.get(`${baseUrl}/api/categories`, {
headers: {
Authorization: `Bearer ${token}`,
},
});
let data = res.data.categories.map((arr) => ({
id: arr?.id,
language_code: arr.translations[0]?.language_code,
name: arr.translations[0]?.name,
}));
setCategoryList(data);
} catch (error) {
console.log("single category error", error);
}
};

useEffect(() => {
fetchSingledata();
fetchCategory();
}, []);

onChange={(e) =>
handleChangeInput(
e,
"document",
index
)

        }


        <span className="text-danger">*</span>


        const EditProduct = () => {
    const { id } = useParams();

<div className="upload-part">
{
imgFile.length > 0 ? (
imgFile.map((file, index) => {
// console.log("123", file);
return (
file.image ? (
<div key={index} className="upload-part-innr">
<img src={`${imgUrl}/${file.image}`} alt={`preview-${index}`} />
<a type='button' onClick={() => handleImgDelete(file._id)}>
<i className='uil uil-times'></i>
</a>
</div>
) : (
<div key={index} className="upload-part-innr">
<img src={URL.createObjectURL(file)} alt={`preview-${index}`} />
<a type='button' onClick={() => handleImageRemove(index)}>
<i className='uil uil-times-square'></i>
</a>
</div>
)
);
})
) : (
<img src={media} alt="Default preview" />
)
}
</div>

add edit img validation
add suncategory delete api
draft


sub category img not show
in coupon ,add type and full banner img url 

today Update


add profile view api and fields
add editor in all pages
add page edit product and add apis
add delete api  in poduct list
add delete api in Sub Category list

create Coupon list page and add api
create Coupon add  page and add api
create Coupon edit page and add api
add delete api in  Coupon list page

create Promotional Campaigns list page and add api
create Promotional Campaigns add  page and add api
create Promotional Campaigns edit page and add api
add delete api in  Promotional Campaigns list page


0
: 
{language_code: 'En', title: 'fsdfs', description: '<p>fsfdsfsf</p>'}
1
: 

2
: 

[
    {language_code: 'En', title: 'fsdfs', description: '<p>fsfdsfsf</p>'},
    {language_code: 'Hi', title: 'sdfsdf', description: '<p>sfdfsdf</p>'},
    {language_code: 'Ar', title: 'sdfs', description: '<p>dfsdf</p>'}
]

const EditBannerSlider = () => {
    const {id} = useParams()

     <div className="upload-product-media d-flex justify-content-between align-items-center mt-25">
                                                            <div className="upload-media-area">
                                                               {
                                                                 imgLoading ? (
                                                                        <span className="spinner-border spinner-border-sm"></span>
                                                                 ):(
                                                                     imgFile? (
                                                                                <img
                                                                            src = {URL.createObjectURL(imgFile)}
                                                                alt="img"
                                                                        />
                                                                ) : (
                                                                currentImage && (
                                                                <img
                                                                    src={`${imgUrl}/${currentImage}`}
                                                                    alt="Current Category"
                                                                    className="img-fluid"
                                                                />
                                                                )
                                                                )
                                                                 )
                                                               }
                                                            </div>
                                                        </div>
                                                            const [imgFile, setImgFile] = useState(null)
    const [loading, setloading] = useState(false)
    const [imgLoading, setImgLoading] = useState(false)

    const [currentImage, setCurrentImage] = useState("")

change blog img url ==> replace blogs to blog in img url 
add img live url in banner 
sub category img issue 
add coupon img full path 


  const AddLanguageRequest = async (data,id) => {
    try {
      const responses = await Promise.all(
        data.map(item =>
          axios.post(`${baseUrl}/api/banners/${id}/translations`, {
            language_code: item.language_code,
            title: item.title,
            description: item.description,
          })
        )
      );
      console.log('All responses:', responses);
    } catch (error) {
      console.error('Error in requests:', error);
    }
  };

"# NextGenAdmin" 
