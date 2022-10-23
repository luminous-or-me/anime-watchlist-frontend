const Filter = ({ filter, onFilterChange }) => (
    <div>
        filter <input
            value={filter}
            onChange={onFilterChange}
        />
    </div>
)

export default Filter