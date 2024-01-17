import React, {useState, FormEvent} from 'react';
import Tree from 'react-d3-tree';

interface TreeNode {
    children?: TreeNode[];
}

function Graph() {
    const [trees, setTrees] = useState<TreeNode[]>([]);
    const [n, setN] = useState('');
    const [maxLeaf, setMaxLeaf] = useState('');

    const fetchTrees = () => {
        fetch(`http://localhost:8080/generate-trees?n=${n}&max_leaf=${maxLeaf}`)
            .then(response => response.json())
            .then((data: TreeNode[]) => setTrees(data))
            .catch(error => console.error('Error fetching tree data:', error));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetchTrees();
    };

    const renderTree = (tree: TreeNode, index: number) => (
        // <td key={index} style={{ border: '1px solid black', margin: '10px', padding: '10px', height:"auto"}}>
        <Tree data={tree} orientation="horizontal" translate={
            {x: 100, y: 50}
        } scaleExtent={
            {min: 0.1, max: 0.3}
        }
              dimensions={
                  {width: 500, height: 500}
              }
        />
        // </td>
    );

    return (
        <div>
            <h2>Dynamic Graph</h2>
            <form onSubmit={handleSubmit}>
                <input type="number" value={n} onChange={e => setN(e.target.value)}/>
                <input type="number" value={maxLeaf} onChange={e => setMaxLeaf(e.target.value)}/>
                <button type="submit">Generate Trees</button>
            </form>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <tbody>
                {/*<tr>*/}
                {/*  {trees.map(renderTree)}*/}
                {/*</tr>*/}
                {trees.map((tree, index) => (
                    <tr key={index} style={{border: '1px solid black', margin: '10px', padding: '10px'}}>
                        {renderTree(tree, index)}
                    </tr>
                ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default Graph;
