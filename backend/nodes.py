from itertools import permutations


class Node:
    def __init__(self):
        self.children = []

    def to_json(self):
        children_list = [child.to_json() for child in self.children]
        return {'children': children_list}


def generate_partitions(n, max_number, prefix=[]):
    if n == 0:
        yield prefix
        return
    for i in range(max_number, 0, -1):
        if i <= n:
            yield from generate_partitions(n - i, max_number, prefix + [i])


def possible_sums(total, max_leaf):
    unique_partitions = set()
    for partition in generate_partitions(total, max_leaf):
        for perm in set(permutations(partition)):
            if perm[0] == 1:
                unique_partitions.add(perm)

    return unique_partitions


def partition_to_matrix(partition):
    max_columns = max(partition)
    matrix = []
    for number in partition:
        row = [1] * number + [None] * (max_columns - number)
        matrix.append(row)
    return matrix


def build_tree(matrix):
    tree = [[Node()]]
    for i, row in enumerate(matrix[1:], start=1):
        cur = []
        for j, elem in enumerate(row):
            if elem:
                new_elem = Node()
                cur.append(new_elem)
                if j == 0:
                    tree[i-1][0].children.append(new_elem)
                if j > 0:
                    tree[i-1][-1].children.append(new_elem)
        tree.append(cur)

    return tree


def make_all_trees(n, max_leaf) -> list:
    """
    returns a list of all possible trees for a given n and max_leaf
    :param n:
    :param max_leaf:
    :return:
    """
    partitions = possible_sums(n, max_leaf)
    trees = []
    for partition in partitions:
        matrix = partition_to_matrix(partition)
        tree = build_tree(matrix)
        trees.append(tree[0][0].to_json())
    return trees



