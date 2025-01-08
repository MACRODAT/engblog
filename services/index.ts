//  @ts-nocheck
import { request , gql, GraphQLClient } from 'graphql-request';
// import { mockPosts } from '../mock/mock_posts';


const graphqlAPI : string = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string;
// console.log(graphqlAPI)\

let linkDict = new Map<String, Sstring>()

export const compileNavigationAlgoLinks = async () => {
    const query = gql`
        query MyQuery {
            posts(first:5000){
                link
            }
            postsConnection(first:5000) {
                edges {
                    node {
                        link
                        children {
                            link
                        }
                    }
                }
            }
        }
    `

    const graphQLClient = new GraphQLClient(graphqlAPI);
    const  result =  graphQLClient.request(query);
    return result.then((_res) => {
        // console.log(_res)
        let dict = new Map<String, Array<String>>()
        _res.posts.forEach((element:any) => {
            dict.set(element.link, "");
            // console.log(element.name)
        });
        let edges = Array.from(_res.postsConnection.edges);
        edges.forEach(item => {
            let name = item.node.link;
            if (item.node.children)
            {
                let children = Array.from(item.node.children);
                children.forEach(c => {
                    dict.set(name, [...dict.get(name), (c.link)])
                })
            }
        });
        return dict;
    }, (_err) => {console.log("error -> " + _err); return []; });
}

export const compileNavigationAlgo = async () => {
    const query = gql`
        query MyQuery {
            posts(first:5000){
                name
                link
            }
            postsConnection(first:5000) {
                edges {
                    node {
                        name
                        children {
                            name
                        }
                    }
                }
            }
        }
    `

    const graphQLClient = new GraphQLClient(graphqlAPI);
    const  result =  graphQLClient.request(query);
    return result.then((_res) => {
        // console.log(_res)
        let dict = new Map<String, Array<String>>()
        _res.posts.forEach((element:any) => {
            dict.set(element.name, "");
            linkDict.set(element.name, element.link);
            // console.log(element.name)
        });
        let edges = Array.from(_res.postsConnection.edges);
        edges.forEach(item => {
            let name = item.node.name;
            if (item.node.children)
            {
                let children = Array.from(item.node.children);
                children.forEach(c => {
                    dict.set(name, [...dict.get(name), (c.name)])
                })
            }
        });
        // console.log(_res)
        return dict;
    }, (_err) => {console.log("error -> " + _err); return []; });
}


export async function getPostDetails(slug : String){
    const graphQLClient = new GraphQLClient(graphqlAPI);
    const query = gql`
            query GetPostDetails($slug : String!) {
                posts(where: { link : $slug}) {
                    createdAt
                    name
                    link
                    content
                    excerpt
                    postdifficulty
                    featureImage {
                      url
                    }
                    children {
                        name
                        excerpt
                    }              
                }
            }
    `;


    const  result =  graphQLClient.request(query, { slug : slug });
    return result.then((_res) => {
        // console.log(_res);
        return _res.posts[0];
    }, (_err) => console.log("error -> " + _err));
}

export async function getIndexPosts(){
    // console.log(lastCategory)
    const graphQLClient = new GraphQLClient(graphqlAPI);
    const query = gql`
            query GetPostMain() {
                posts(where: {link: "mainfreelancing"}) {
                    createdAt
                    name
                    link
                    content
                    excerpt
                    featureImage {
                      url
                    }
                    children {
                        name
                        excerpt
                    }
                }
            }
    `;


    const  result =  graphQLClient.request(query);
    return result.then((_res) => {
        // console.log(_res)
        return _res.posts[0];
    }, (_err) => console.log("error -> " + _err));
}

export {
    linkDict
}
