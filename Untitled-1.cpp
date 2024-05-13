#include<iostream>
using namespace std;

class node {
    public:
    int data;
    node* left;
    node* right;


 node(int d){
    this -> data = d;
    this -> left = NULL;
    this -> right = NULL;




void levelordertraversal( node* root) {
    queue<node*> q;
    q. push(root);
    q. push(NULL);

    while (!q.empty()){
        node* temp = q.front(); 
        q.pop();

        if (temp == NULL) {
            cout << endl;
            if(!q.empty()){
                q.push(NULL);
            }
        }
        else{
            cout << temp -> data <<" ";
            if(temp -> left ){
                q.push(temp -> left);
            }
            if(temp -> right){
                q.push(temp -> right);
            }
        }
    }
}

 }




node* buildtree(node* root){

    cout<<"enter the data: " <<endl;
    int data;
    cin>> data;
    root = new node(data);

    if(data == -1){
        return NULL;
    }

    cout << "enter data for inserting in the left of the tree " << data << endl;
    root -> left = buildtree(root->left);

    cout << "enter data for inserting in the right of the tree " << data << endl;
    root -> right = buildtree(root->right);
    return root; 

}

int main (){

    node* root = NULL;

    root = buildtree(root);

    
    return 0 ;
}
