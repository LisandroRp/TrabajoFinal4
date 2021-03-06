import ProductService from '../../service/ProductService.js'
import _ from 'lodash';

class ProductController {

    getAll = async (req, res) => {
        ProductService.getAll().then(products => {
            res.render("./products/ProductMain", {
                productList: products, username: req.session.username,
                categories: _.uniqBy(products, 'category').map((product) => { return product.category.charAt(0).toUpperCase() + product.category.slice(1) })
            })
        }).catch(err => {
            if (err.error == 404)
                res.render("./products/ProductMain", { productList: [], username: req.session.username, categories: [] })
            else {
                res.status(err.error)
                res.json(err)
            }
        })
    }

    getByIdCategory = async (req, res) => {
        ProductService.getAll().then(products => {
            console.log(products.filter((product) => _.isEqual(product.category, req.params.category)));
            res.render("./categories/CategoriesMain", { productList: products.filter((product) => _.isEqual(product.category, req.params.category)), username: req.session.username })
        }).catch(err => {
            if (err.error == 404)
                res.render("./categories/CategoriesMain", { productList: products.filter((product) => _.isEqual(product.category, req.params.category)), username: req.session.username })
            else {
                res.status(err.error)
                res.json(err)
            }
        })
    }

    getById = async (req, res) => {
        ProductService.getById(req.params.id).then(product => {
            res.render('./products/ProductDetails', { product: product, username: req.session.username })
        }).catch(err => {
            res.render('./messagesScreen/Error', { message: err.description, username: req.session.username })
        })
    }

    getCart = async (req, res) => {
        ProductService.getAll().then(products => {
            res.render("./cart/CartMain", { productList: products, username: req.session.username })
        }).catch(err => {
            if (err.error == 404)
                res.render("./cart/CartMain", { productList: [], username: req.session.username })
            else {
                res.status(err.error)
                res.json(err)
            }
        })
    }

    deleteById = (req, res) => {
        console.log(req.params.id);
        ProductService.deleteById(req.params.id).then((response) => {
            res.render('./messagesScreen/Success', { message: response.response, username: req.session.username })
        }).catch(err => {
            console.log(err.error)
            res.render('./messagesScreen/Error', { message: err.description, username: req.session.username })
        })
    }

    edit = async (req, res) => {
        ProductService.getById(req.params.id).then(product => {
            res.render('./products/ProductUpdate', { product: product, username: req.session.username })
        }).catch(err => {
            res.status(err.error)
            res.render('./messagesScreen/Error', { message: err.description, username: req.session.username })
        })
    }

    update = async (req, res) => {
        console.log(req.body);
        ProductService.update(req.body).then(response => {
            res.render('./messagesScreen/Success', { message: response.response, username: req.session.username })
        }).catch(err => {
            res.status(err.error)
            res.render('./messagesScreen/Error', { message: err.description, username: req.session.username })
        })
    }
    
}
export default new ProductController();
