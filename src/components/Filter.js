const Filter = (props) => (
    <div>
        filter <input
            value={props.filter}
            onChange={props.onFilterChange}
        />
    </div>
)

export default Filter